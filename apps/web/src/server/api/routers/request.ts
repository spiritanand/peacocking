import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@web/server/api/trpc";
import { db } from "@web/server/db";
import { eq } from "drizzle-orm";
import { requests } from "@web/server/db/schema";
import { falAxiosInstance } from "@web/data/axiosClient";

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
      console.log({ input });

      try {
        const res = await falAxiosInstance.get(
          "fal-ai/flux-lora-general-training/requests/6df7e317-6639-4e01-a95f-354208f18d8b",
        );
        const data = res.data;

        console.log({ data });
      } catch (e) {
        console.log({ e });
      }

      return {
        status: "IN_QUEUE",
        queue_position: 0,
        response_url:
          "https://queue.fal.run/fal-ai/fast-sdxl/requests/80e732af-660e-45cd-bd63-580e4f2a94cc",
      };
    }),
});
