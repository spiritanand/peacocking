import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@web/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { falAxiosInstance } from "@web/data/axiosClient";
import { EnqueueResponseSchema, type EnqueueResponse } from "@web/lib/types";
import { db } from "@web/server/db";
import { requests } from "@web/server/db/schema";
import { RequestType } from "@web/lib/constants";

export const falRouter = createTRPCRouter({
  createModel: protectedProcedure
    .input(z.object({ zipUrl: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const { zipUrl } = input;

      const trigger = "peacocked";
      const steps = 1;

      const res = await falAxiosInstance.post<EnqueueResponse>(
        "fal-ai/flux-lora-general-training",
        {
          images_data_url: zipUrl,
          steps,
          trigger_word: trigger,
          rank: 16,
          learning_rate: 0.0004,
          experimental_optimizers: "adamw8bit",
          experimental_multi_checkpoints_count: 1,
        },
      );

      const parsed = EnqueueResponseSchema.safeParse(res.data);

      if (!parsed.success) throw new TRPCError({ code: "PARSE_ERROR" });

      const { data } = parsed;

      const { request_id, response_url, status_url, cancel_url } = data;

      await db.insert(requests).values({
        id: request_id,
        userId,
        statusUrl: status_url,
        responseUrl: response_url,
        cancelUrl: cancel_url,
        type: RequestType.MODEL,
      });

      return {
        requestId: request_id,
      };
    }),
});
