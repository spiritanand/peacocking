import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@web/server/api/trpc";

export const falRouter = createTRPCRouter({
  createModel: protectedProcedure
    .input(z.object({ zip: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log("Uploading file:", input.zip);
      console.log({ ctx });

      return {
        url: "https://example.com",
      };
    }),
});
