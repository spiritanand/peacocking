import { createTRPCRouter, protectedProcedure } from "@web/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.input(z.null()).query(async ({ ctx }) => ({
    user: ctx.session.user,
  })),
});
