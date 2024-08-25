import { z } from "zod";
import axios from "axios";

import { createTRPCRouter, protectedProcedure } from "@web/server/api/trpc";
import { env } from "@web/env";

interface EnqueueResponse {
  request_id: string;
  response_url: string;
  status_url: string;
  cancel_url: string;
}

export const falRouter = createTRPCRouter({
  createModel: protectedProcedure
    .input(z.object({ zipUrl: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { zipUrl } = input;

      const trainingQueueUrl =
        "https://queue.fal.run/fal-ai/flux-lora-general-training";
      const trigger = "peacocked";

      // const response = await axios({
      //   url: trainingQueueUrl,
      //   method: "POST",
      //   headers: {
      //     Authorization: `Key ${env.FAL_KEY}`,
      //   },
      //   data: {
      //     images_data_url: zipUrl,
      //     steps: 1,
      //     trigger_word: trigger,
      // rank: 16,
      // learning_rate: 0.0004,
      // experimental_optimizers: "adamw8bit",
      // experimental_multi_checkpoints_count: 1,
      // },
      // });

      // if (response.status !== 200 || !response.data)
      //   throw new TRPCError({
      //     code: "INTERNAL_SERVER_ERROR",
      //     message: "Failed to create model",
      //   });
      //
      // const { request_id, response_url, status_url, cancel_url } =
      //   response.data as EnqueueResponse;

      const data = {
        status: "IN_QUEUE",
        request_id: "6df7e317-6639-4e01-a95f-354208f18d8b",
        response_url:
          "https://queue.fal.run/fal-ai/flux-lora-general-training/requests/6df7e317-6639-4e01-a95f-354208f18d8b",
        status_url:
          "https://queue.fal.run/fal-ai/flux-lora-general-training/requests/6df7e317-6639-4e01-a95f-354208f18d8b/status",
        cancel_url:
          "https://queue.fal.run/fal-ai/flux-lora-general-training/requests/6df7e317-6639-4e01-a95f-354208f18d8b/cancel",
        logs: null,
        metrics: {},
        queue_position: 0,
      };

      // response_url: data.response_url,
      //   status_url: data.status_url,
      //   cancel_url: data.cancel_url,

      return {
        requestId: data.request_id,
      };
    }),
  getTrainingStatus: protectedProcedure
    .input(z.object({ statusUrl: z.string() }))
    .query(async ({ ctx, input }) => {
      const { statusUrl } = input;

      const response = await axios(statusUrl, {
        method: "GET",
        headers: {
          Authorization: `Key ${env.FAL_KEY}`,
        },
      });

      return {
        status: response.data.status,
        queue_position: response.data.queue_position,
      };
    }),
});
