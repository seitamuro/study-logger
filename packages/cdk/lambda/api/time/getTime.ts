import { createRoute, RouteHandler } from '@hono/zod-openapi';
import { ErrorResponse } from 'types/models/error';
import { TimeSchema } from 'types/models/time';

export const getTimeRoute = createRoute({
  path: '/',
  method: 'get',
  description: 'Get the current time',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: TimeSchema,
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

export const getTimeHandler: RouteHandler<typeof getTimeRoute> = async (c) => {
  try {
    const time = new Date().toISOString();
    return c.json({ time }, 200);
  } catch (error) {
    return c.json({ message: 'Internal server error occurred while getting time' }, 500);
  }
};
