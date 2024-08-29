import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@web/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@web/server/db";
import { models, requests } from "@web/server/db/schema";
import { ImageSize, OutputFormat, RequestType } from "@web/lib/constants";
import { eq } from "drizzle-orm";
import * as fal from "@fal-ai/serverless-client";
import { env } from "@web/env";

const hostedUrl = "https://0l2pfp74-3000.inc1.devtunnels.ms";

fal.config({
  credentials: env.FAL_KEY,
});

export const falRouter = createTRPCRouter({
  createModel: protectedProcedure
    .input(z.object({ zipUrl: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const { zipUrl } = input;

      const trigger = "peacocked";
      const steps = 1;

      const appId = "fal-ai/flux-lora-general-training";

      const res = await fal.queue.submit(appId, {
        input: {
          images_data_url: zipUrl,
          steps,
          trigger_word: trigger,
          rank: 16,
          learning_rate: 0.0004,
          experimental_optimizers: "adamw8bit",
          experimental_multi_checkpoints_count: 1,
        },
        webhookUrl: `${hostedUrl}/api/fal/webhook/model`, //TODO: Make dynamic,
      });

      const { request_id } = res;
      const statusUrl = `https://queue.fal.run/${appId}/requests/${request_id}/status`;
      const responseUrl = `https://queue.fal.run/${appId}/requests/${request_id}`;
      const cancelUrl = `https://queue.fal.run/${appId}/requests/${request_id}/cancel`;

      await db.insert(requests).values({
        id: request_id,
        userId,
        statusUrl,
        responseUrl,
        cancelUrl,
        type: RequestType.MODEL,
      });

      return {
        requestId: request_id,
      };
    }),
  createImage: protectedProcedure
    .input(z.object({ modelId: z.string(), prompt: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { modelId, prompt } = input;

      const model = await db.query.models.findFirst({
        where: eq(models.id, modelId),
        with: {
          request: {
            columns: {
              userId: true,
            },
          },
        },
      });

      // Check if the model exists and belongs to the user
      if (!model) throw new TRPCError({ code: "NOT_FOUND" });
      if (model.request.userId !== userId)
        throw new TRPCError({ code: "UNAUTHORIZED" });
      if (!model.loraFile) throw new TRPCError({ code: "NOT_FOUND" });

      const appId = "fal-ai/flux-lora";

      const res = await fal.queue.submit(appId, {
        input: {
          loras: [{ path: model.loraFile, scale: 1 }],
          prompt: prompt ?? "Portrait of peacocked man person",
          image_size: ImageSize.LANDSCAPE_4_3,
          num_images: 1,
          output_format: OutputFormat.JPEG,
          num_inference_steps: 28,
          guidance_scale: 3.5,
          enable_safety_checker: true,
        },
        webhookUrl: `${hostedUrl}/api/fal/webhook/gen`, //TODO: Make dynamic
      });

      const { request_id } = res;
      const statusUrl = `https://queue.fal.run/${appId}/requests/${request_id}/status`;
      const responseUrl = `https://queue.fal.run/${appId}/requests/${request_id}`;
      const cancelUrl = `https://queue.fal.run/${appId}/requests/${request_id}/cancel`;

      await db.insert(requests).values({
        id: request_id,
        userId,
        statusUrl,
        responseUrl,
        cancelUrl,
        type: RequestType.GEN,
      });

      return {
        requestId: request_id,
      };
    }),
});
