import { z } from "@hono/zod-openapi";

export const TimerRecordSchema = z.object({
  userId: z.string(),
  timestamp: z.string().transform((val) => new Date(val).toISOString()),
  status: z.enum(["not started", "in progress", "completed", "failed"]),
  duration: z.number(),
});

export type TimerRecordSchema = z.infer<typeof TimerRecordSchema>;
