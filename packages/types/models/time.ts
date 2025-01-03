import { z } from "@hono/zod-openapi";

export const TimeSchema = z
  .object({
    time: z.string().transform((val) => new Date(val).toISOString()),
  })
  .openapi("TimeSchema");

export type TimeSchema = z.infer<typeof TimeSchema>;
