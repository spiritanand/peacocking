import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { db } from "@web/server/db";
import { gens, requests } from "@web/server/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { RequestStatus } from "@web/lib/constants";
import { falAxiosInstance } from "@web/data/axiosClient";
import {
  type ImageGenerationOutput,
  ImageGenerationOutputSchema,
} from "@web/lib/types";

export const genRouter = createTRPCRouter({
  getMyGensByModelId: protectedProcedure
    .input(z.object({ modelId: z.string() }))
    .query(async ({ ctx, input }) =>
      db.query.gens.findMany({
        orderBy: desc(gens.createdAt),
        where: and(
          eq(gens.modelId, input.modelId),
          eq(gens.userId, ctx.session.user.id),
        ),
        with: {
          model: true,
        },
      }),
    ),
  updateGen: protectedProcedure
    .input(z.object({ requestId: z.string(), responseUrl: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { requestId, responseUrl } = input;

      try {
        const res =
          await falAxiosInstance.get<ImageGenerationOutput>(responseUrl);

        const parsed = ImageGenerationOutputSchema.safeParse(res.data);

        if (!parsed.success) return false;

        const data = parsed.data;

        await db
          .update(requests)
          .set({
            status: RequestStatus.COMPLETED,
          })
          .where(and(eq(requests.id, requestId), eq(requests.userId, userId)));

        await db
          .update(gens)
          .set({
            output: data,
          })
          .where(and(eq(gens.requestId, requestId), eq(gens.userId, userId)));

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }),
});
