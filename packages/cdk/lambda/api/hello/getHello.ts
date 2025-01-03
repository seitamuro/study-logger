import { createRoute, RouteHandler } from '@hono/zod-openapi';
import { ErrorResponse, MessageSchema } from 'types/models';

export const getHellRoute = createRoute({
  path: '/',
  method: 'get',
  description: 'Get a hello message',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: MessageSchema,
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

export const getHelloHandler: RouteHandler<typeof getHellRoute, {}> = async (c) => {
  return c.json({ message: 'Hello, World!' });
};
