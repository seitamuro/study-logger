import { createRoute, RouteHandler } from '@hono/zod-openapi';
import { ErrorResponse, MessageSchema } from 'types/models';

export const postEchoRoute = createRoute({
  path: '/',
  method: 'post',
  description: 'Echo a message',
  request: {
    body: {
      content: {
        'application/json': {
          schema: MessageSchema,
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
  },
  500: {
    description: 'Internal Server Error',
    content: {
      'application/json': {
        schema: ErrorResponse,
      },
    },
  },
});

export const postEchoHandler: RouteHandler<typeof postEchoRoute, {}> = async (c) => {
  const body = await c.req.json();
  return c.json({ message: body.message });
};
