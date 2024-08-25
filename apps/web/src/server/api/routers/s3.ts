import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@web/server/api/trpc";

export const s3Router = createTRPCRouter({
  getSignedUrl: protectedProcedure
    .input(z.object({ files: z.string() }))
    .query(async () => {
      return {
        url: "https://example.com",
      };
    }),
});
