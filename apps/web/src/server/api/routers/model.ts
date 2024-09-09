import { createTRPCRouter, protectedProcedure } from "@web/server/api/trpc";
import { getAllModelsByUser } from "@web/data/db";

export const modelRouter = createTRPCRouter({
  getAllModelsByUser: protectedProcedure.query(async () =>
    getAllModelsByUser(),
  ),
});
