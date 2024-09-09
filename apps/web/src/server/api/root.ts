import { s3Router } from "@web/server/api/routers/s3";
import { createCallerFactory, createTRPCRouter } from "@web/server/api/trpc";
import { falRouter } from "./routers/fal";
import { requestRouter } from "@web/server/api/routers/request";
import { genRouter } from "./routers/gen";
import { modelRouter } from "./routers/model";
import { userRouter } from "./routers/user";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  s3: s3Router,
  fal: falRouter,
  request: requestRouter,
  gen: genRouter,
  model: modelRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

/**
 * Create a server-side caller for the tRPC API.
 */
export const createCaller = createCallerFactory(appRouter);
