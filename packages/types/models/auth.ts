import { z } from "@hono/zod-openapi";

export const AuthorizationSchema = z
  .object({
    idToken: z.string(),
  })
  .openapi("AuthorizationSchema");

export type AuthorizationSchema = z.infer<typeof AuthorizationSchema>;
