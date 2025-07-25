import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import { ZodError } from "zod";

import { db } from "@/server/db";
import { auth } from "@/lib/auth";

/**
 * 1. CONTEXT
 *
 * This function creates the tRPC context for each request. It includes the user's session
 * (via BetterAuth) and the database client.
 */
// Helper type for the BetterAuth session
// If you change your auth provider, update this accordingly.
export type SessionType = Awaited<ReturnType<typeof auth.api.getSession>>;

// Strongly-typed tRPC context shared across all procedures/routers
export interface TRPCContext {
  session: SessionType | null;
  db: typeof db;
  req: CreateNextContextOptions["req"];
  res: CreateNextContextOptions["res"];
}

export const createTRPCContext = async ({
  req,
  res: _res,
}: CreateNextContextOptions): Promise<TRPCContext> => {
  // Convert Node-style headers into the Fetch API `Headers` instance expected by BetterAuth
  const fetchHeaders = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      fetchHeaders.set(key, value.join(","));
    } else if (value !== undefined) {
      fetchHeaders.set(key, value);
    }
  }
  const session = await auth.api.getSession({ headers: fetchHeaders }); // BetterAuth session

  return {
    session, // now available in procedures via ctx.session
    db, // optional if you use db in routers
    req,
    res: _res,
  };
};

/**
 * 2. INITIALIZATION
 *
 * We initialize tRPC here and connect the context and error formatting.
 */
const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE SETUP
 *
 * You will use these pieces to build your API.
 */
export const createTRPCRouter = t.router;

/**
 * Middleware to simulate network latency and log timing in development.
 */
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (process.env.NODE_ENV === "development") {
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[tRPC] ${path} took ${end - start}ms`);

  return result;
});

/**
 * Public procedure (no auth required).
 */
export const publicProcedure = t.procedure.use(timingMiddleware);

/**
 * Middleware to check if the user is authenticated.
 */
export const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in.",
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.session.user, // `ctx.session?.user` is guaranteed here due to the auth check above.
    },
  });
});

/**
 * Protected procedure (user must be authenticated).
 */
export const protectedProcedure = t.procedure.use(isAuthenticated);
