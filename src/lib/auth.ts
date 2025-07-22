import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { env } from "@/env";
import { db } from "@/server/db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
        clientId: env.GITHUB_AUTH_CLIENT_ID,
        clientSecret: env.GITHUB_AUTH_CLIENT_SECRET,
    }
  }
});
