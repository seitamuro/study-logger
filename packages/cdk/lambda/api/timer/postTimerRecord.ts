import { createRoute, RouteHandler, z } from '@hono/zod-openapi';
import {
  ErrorResponse,
  MessageSchema,
  PostTimerRecordRequestSchema,
  TimerRecordStatus,
} from 'types/models';
import { Env } from '../../index';
import { updateTimerRecord } from './common/';

export const postTimerRecordRoute = createRoute({
  path: '/record',
  method: 'post',
  description: 'Record a timer',
  security: [{ Authorization: [] }],
  request: {
    headers: z.object({
      Authorization: z.string().openapi({
        description: 'idToken',
        example: '<idToken>',
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: PostTimerRecordRequestSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: MessageSchema,
        },
      },
    },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: ErrorResponse,
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: ErrorResponse,
        },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: ErrorResponse,
        },
      },
    },
  },
});

export const postTimerRecordHandler: RouteHandler<typeof postTimerRecordRoute, Env> = async (c) => {
  try {
    const payload = c.get('idTokenPayload');
    const rawBody = await c.req.json();
    const body = PostTimerRecordRequestSchema.parse(rawBody);

    const record = {
      userId: payload.sub,
      timestamp: new Date().toISOString(),
      status: TimerRecordStatus.Completed,
      duration: body.duration,
    };

    await updateTimerRecord(record);

    return c.json({ message: 'timer is recorded' }, 200);
  } catch (e) {
    console.error(e);
    if (e instanceof z.ZodError) {
      return c.json({ message: 'Invalid request body' }, 400);
    }
    return c.json({ message: 'Failed to start timer' }, 500);
  }
};
