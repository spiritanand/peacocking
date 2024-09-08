import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@web/server/api/trpc";
import { db } from "@web/server/db";
import { eq } from "drizzle-orm";
import { requests } from "@web/server/db/schema";
import { falAxiosInstance } from "@web/data/axiosClient";
import { type ModelStatus, ModelStatusSchema } from "@web/lib/types";
import { TRPCError } from "@trpc/server";
import { RequestStatus } from "@web/lib/constants";

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
      const { status, queue_position } = data;

      // Update the request status in the database if it has changed
      if (prevStatus !== status)
        await db.update(requests).set({ status }).where(eq(requests.id, id));

      return {
        status,
        queuePosition: queue_position ?? -1,
      };
    }),
});
