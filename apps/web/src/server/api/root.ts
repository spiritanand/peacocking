import { s3Router } from "@web/server/api/routers/s3";
import { createCallerFactory, createTRPCRouter } from "@web/server/api/trpc";
import { falRouter } from "./routers/fal";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  s3: s3Router,
  falRoute: falRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 */
export const createCaller = createCallerFactory(appRouter);
