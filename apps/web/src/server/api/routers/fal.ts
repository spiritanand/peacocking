import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@web/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@web/server/db";
import { models, requests } from "@web/server/db/schema";
import { ImageSize, OutputFormat, RequestType } from "@web/lib/constants";
import { eq } from "drizzle-orm";
import * as fal from "@fal-ai/serverless-client";
import { env } from "@web/env";
import {
  type ModelTrainInput,
  type ImageGenerationInput,
} from "@web/lib/types";

const hostedUrl = "https://0l2pfp74-3000.inc1.devtunnels.ms";

fal.config({
  credentials: env.FAL_KEY,
});

async function submitToFalQueue({
  appId,
  input,
  webhookPath,
  userId,
  requestType,
}: {
  appId: string;
  input: ModelTrainInput | ImageGenerationInput;
  webhookPath: string;
  userId: string;
  requestType: RequestType;
}) {
  const webhookUrl = new URL(webhookPath, hostedUrl).toString(); //TODO: Make dynamic

  const res = await fal.queue.submit(appId, {
    input,
    // webhookUrl: `${env.WEBHOOK_BASE_URL}${webhookPath}`,
    webhookUrl,
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
    type: requestType,
  });

  return {
    requestId: request_id,
  };
}

export const falRouter = createTRPCRouter({
  createModel: protectedProcedure
    .input(z.object({ zipUrl: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const { zipUrl } = input;
      const trigger_word = "peacocked";
      const steps = 1;

      return submitToFalQueue({
        appId: "fal-ai/flux-lora-general-training",
        input: {
          images_data_url: zipUrl,
          steps,
          trigger_word,
          rank: 16,
          learning_rate: 0.0004,
          experimental_optimizers: "adamw8bit",
          experimental_multi_checkpoints_count: 1,
        },
        webhookPath: "api/fal/webhook/model",
        userId,
        requestType: RequestType.MODEL,
      });
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

      return submitToFalQueue({
        appId: "fal-ai/flux-lora",
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
        webhookPath: "api/fal/webhook/gen",
        userId,
        requestType: RequestType.GEN,
      });
    }),
});
