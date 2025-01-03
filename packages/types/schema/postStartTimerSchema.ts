import { z } from "zod";

export const postStartTimerSchemaRequest = z.object({
  duration: z.number(),
});

export type PostStartTimerRequest = z.infer<typeof postStartTimerSchemaRequest>;
