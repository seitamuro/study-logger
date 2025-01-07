import { z } from "@hono/zod-openapi";

export const MessageSchema = z
  .object({
    message: z.string(),
  })
  .openapi("MessageSchema");

export type Message = z.infer<typeof MessageSchema>;
