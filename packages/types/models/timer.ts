import { z } from "@hono/zod-openapi";

export enum TimerRecordStatus {
  NotStarted = "not started",
  InProgress = "in progress",
  Completed = "completed",
  Failed = "failed",
}

export const TimerRecordStatusSchema = z.nativeEnum(TimerRecordStatus);

export const TimerRecordSchema = z.object({
  userId: z.string(),
  timestamp: z.string().transform((val) => new Date(val).toISOString()),
  status: TimerRecordStatusSchema,
  duration: z.number(),
});
export type TimerRecord = z.infer<typeof TimerRecordSchema>;
