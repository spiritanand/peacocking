import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@web/server/api/trpc";
import { db } from "@web/server/db";
import { eq } from "drizzle-orm";
import { requests } from "@web/server/db/schema";
import { falAxiosInstance } from "@web/data/axiosClient";
import {
  type ModelCreationOutput,
  ModelCreationOutputSchema,
  type ModelStatus,
  ModelStatusSchema,
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
    .input(
      z.object({
        id: z.string(),
        statusUrl: z.string(),
        prevStatus: z.nativeEnum(RequestStatus),
      }),
    )
    .query(async ({ input }) => {
      const { id, statusUrl, prevStatus } = input;

      const getStatusRes = await falAxiosInstance.get<ModelStatus>(statusUrl);

      // Validate the response data
      const parsed = ModelStatusSchema.safeParse(getStatusRes.data);

      if (!parsed.success) throw new TRPCError({ code: "PARSE_ERROR" });

      const { data } = parsed;
      const { status, response_url, queue_position } = data;

      // Update the request status in the database if it has changed
      if (prevStatus !== status)
        await db.update(requests).set({ status }).where(eq(requests.id, id));

      let modelId = "";

      // If the request is completed, fetch the response data and update the database
      if (status === RequestStatus.COMPLETED) {
        const res =
          await falAxiosInstance.get<ModelCreationOutput>(response_url);

        const parsed = ModelCreationOutputSchema.safeParse(res.data);

        if (!parsed.success) throw new TRPCError({ code: "PARSE_ERROR" });

        const { data } = parsed;
        const { config_file, diffusers_lora_file } = data;

        // Insert the created model into the database
        const insertedId = await insertModel({
          requestId: id,
          configFile: config_file.url,
          loraFile: diffusers_lora_file.url,
        });

        modelId = insertedId.id;
      }

      return {
        status,
        queuePosition: queue_position ?? -1,
        modelId,
      };
    }),
});
