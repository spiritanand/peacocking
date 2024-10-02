import { createTRPCRouter, protectedProcedure } from "@web/server/api/trpc";
import { getAllCompletedModelsByUser } from "@web/data/db";
import { z } from "zod";
import { db } from "@web/server/db";
import { models } from "@web/server/db/schema";
import { and, eq } from "drizzle-orm";

export const modelRouter = createTRPCRouter({
  getAllCompletedModelsByUser: protectedProcedure.query(async () =>
    getAllCompletedModelsByUser(),
  ),
  updateModelName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, name } = input;

      await db
        .update(models)
        .set({
          name: name.trim(),
        })
        .where(and(eq(models.id, id), eq(models.userId, ctx.session.user.id)));

      return { success: true, message: "Model name updated" };
    }),
  updateFeaturedPhoto: protectedProcedure
    .input(z.object({ id: z.string(), photoUrl: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, photoUrl } = input;

      await db
        .update(models)
        .set({ featurePhotoUrl: photoUrl })
        .where(and(eq(models.id, id), eq(models.userId, ctx.session.user.id)));

      return { success: true, message: "Featured photo updated" };
    }),
});
