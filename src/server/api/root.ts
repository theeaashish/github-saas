import { postRouter } from "@/server/api/routers/post";
import { projectRouter } from "@/server/api/routers/project";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  project: projectRouter,
});

// Export type definition of API for frontend use
export type AppRouter = typeof appRouter;
