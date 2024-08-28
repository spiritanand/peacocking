import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@web/server/api/trpc";
import { db } from "@web/server/db";
import { eq } from "drizzle-orm";
import { requests } from "@web/server/db/schema";
import { falAxiosInstance } from "@web/data/axiosClient";
import {
  type ModelStatus,
  ModelStatusSchema,
  type ModelTrainResponse,
  ModelTrainResponseSchema,
} from "@web/lib/types";
import { TRPCError } from "@trpc/server";
import { RequestStatus } from "@web/lib/constants";
import { insertModel } from "@web/data/db";

export const requestRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ requestId: z.string() }))
    .query(async ({ input }) =>
      db.query.requests.findFirst({
        where: eq(requests.id, input.requestId),
      }),
    ),
  getStatusByUrl: protectedProcedure
    .input(z.object({ statusUrl: z.string() }))
    .query(async ({ input }) => {
      const getStatusRes = await falAxiosInstance.get<ModelStatus>(
        input.statusUrl,
      );

      // Validate the response data
      const parsed = ModelStatusSchema.safeParse(getStatusRes.data);

      if (!parsed.success) throw new TRPCError({ code: "PARSE_ERROR" });

      const { data } = parsed;
      const { status, response_url, queue_position } = data;

      if (status === RequestStatus.FAILED)
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      // If the request is completed, fetch the response data and update the database
      if (status === RequestStatus.COMPLETED) {
        const res =
          await falAxiosInstance.get<ModelTrainResponse>(response_url);

        const parsed = ModelTrainResponseSchema.safeParse(res.data);

        if (!parsed.success) throw new TRPCError({ code: "PARSE_ERROR" });

        const { data } = parsed;
        const { response } = data;

        const urlParts = response_url.split("/");
        // Extract the last segment
        const requestId = urlParts[urlParts.length - 1];

        if (!requestId) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        // Update the request status
        await db
          .update(requests)
          .set({ status: RequestStatus.COMPLETED })
          .where(eq(requests.id, requestId));

        // Insert the created model into the database
        await insertModel({
          requestId,
          configFile: response.config_file.url,
          loraFile: response.diffusers_lora_file.url,
        });
      }

      return {
        status,
        queuePosition: queue_position ?? -1,
      };
    }),
});
