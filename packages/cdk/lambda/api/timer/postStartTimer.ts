import { createRoute, RouteHandler, z } from '@hono/zod-openapi';
import { ErrorResponse, MessageSchema } from 'types/models';
import { Env } from '../../index';
import { startTimerRecord } from './common/updateRecord';

const requestBodySchema = z.object({
  duration: z.number(),
});

export const postStartTimerRoute = createRoute({
  path: '/',
  method: 'post',
  description: 'Start a timer',
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
          schema: requestBodySchema,
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

export const postStartTimerHandler: RouteHandler<typeof postStartTimerRoute, Env> = async (c) => {
  try {
    const payload = c.get('idTokenPayload');
    const rawBody = await c.req.json();
    const body = requestBodySchema.parse(rawBody);

    await startTimerRecord(payload.sub, body.duration);

    return c.json({ message: 'timer is started' }, 200);
  } catch (e) {
    console.error(e);
    if (e instanceof z.ZodError) {
      return c.json({ message: 'Invalid request body' }, 400);
    }
    return c.json({ message: 'Failed to start timer' }, 500);
  }
};
