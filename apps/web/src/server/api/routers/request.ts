import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@web/server/api/trpc";
import { db } from "@web/server/db";
import { eq } from "drizzle-orm";
import { requests } from "@web/server/db/schema";

export const requestRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ requestId: z.string() }))
    .query(async ({ input }) =>
      db.query.requests.findFirst({
        where: eq(requests.id, input.requestId),
      }),
    ),
});
