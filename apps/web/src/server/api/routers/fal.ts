import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@web/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@web/server/db";
import { gens, models, requests, users } from "@web/server/db/schema";
import { ImageSize, OutputFormat, RequestType } from "@web/lib/constants";
import { and, eq } from "drizzle-orm";
import * as fal from "@fal-ai/serverless-client";
import { env } from "@web/env";
import {
  type ModelTrainInput,
  type ImageGenerationInput,
} from "@web/lib/types";

const trigger_word = "peacockedproender";

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
  const webhookUrl = new URL(webhookPath, env.WEBHOOK_BASE_URL).toString();

  const res = await fal.queue.submit(appId, {
    input,
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
    responseUrl,
  };
}

export const falRouter = createTRPCRouter({
  createModel: protectedProcedure
    .input(z.object({ zipUrl: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const currentCredits = ctx.session.user.credits;

      if (currentCredits < 5) throw new TRPCError({ code: "FORBIDDEN" });

      const { zipUrl } = input;
      const steps = 1000;

      const result = await submitToFalQueue({
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

      await db
        .update(users)
        .set({ credits: currentCredits - 5 })
        .where(eq(users.id, userId));

      return result;
    }),
  createImage: protectedProcedure
    .input(z.object({ modelId: z.string(), prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const currentCredits = ctx.session.user.credits;

      if (currentCredits < 1) throw new TRPCError({ code: "FORBIDDEN" });

      const { modelId, prompt } = input;

      const model = await db.query.models.findFirst({
        where: and(eq(models.id, modelId), eq(models.userId, userId)),
      });

      // Check if the model exists
      if (!model) throw new TRPCError({ code: "NOT_FOUND" });
      if (!model.loraFile) throw new TRPCError({ code: "NOT_FOUND" });

      const inputImageGen: ImageGenerationInput = {
        loras: [
          { path: model.loraFile, scale: 1 },
          // {
          //   path: "https://huggingface.co/XLabs-AI/flux-RealismLora/resolve/main/lora.safetensors",
          //   scale: 0.4,
          // },
        ],
        prompt: `${trigger_word} ${prompt}`,
        image_size: ImageSize.PORTRAIT_4_3,
        num_images: 1,
        output_format: OutputFormat.JPEG,
        num_inference_steps: 28,
        guidance_scale: 3.5,
        enable_safety_checker: true,
      };

      const { requestId, responseUrl } = await submitToFalQueue({
        appId: "fal-ai/flux-lora",
        input: inputImageGen,
        webhookPath: "api/fal/webhook/gen",
        userId,
        requestType: RequestType.GEN,
      });

      await db.insert(gens).values({
        modelId,
        requestId,
        userId,
        input: inputImageGen,
      });

      await db
        .update(users)
        .set({ credits: currentCredits - 0.25 })
        .where(eq(users.id, userId));

      return { requestId, responseUrl };
    }),
});
