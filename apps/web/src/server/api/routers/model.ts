import { createTRPCRouter, protectedProcedure } from "@web/server/api/trpc";
import { getAllCompletedModelsByUser } from "@web/data/db";

export const modelRouter = createTRPCRouter({
  getAllCompletedModelsByUser: protectedProcedure.query(async () =>
    getAllCompletedModelsByUser(),
  ),
});
