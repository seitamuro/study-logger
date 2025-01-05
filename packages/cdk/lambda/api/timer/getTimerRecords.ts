import { createRoute, RouteHandler } from '@hono/zod-openapi';
import { TimerRecordSchema } from 'types/models';
import { z } from 'zod';
import { Env } from '../..';
import { getTimerRecords } from './common';

export const getTimerRecordsRoute = createRoute({
  path: '/records/{year}/{month}',
  method: 'get',
  description: 'Get timer records',
  security: [{ Authorization: [] }],
  request: {
    headers: z.object({
      Authorization: z.string().openapi({
        description: 'idToken',
        example: '<idToken>',
      }),
    }),
    params: z.object({
      year: z.string().openapi({
        param: {
          name: 'year',
          in: 'path',
          description: 'Year',
          example: 2021,
        },
      }),
      month: z.string().openapi({
        param: {
          name: 'month',
          in: 'path',
          description: 'Month',
          example: '1',
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: TimerRecordSchema.array(),
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});

export const getTimerRecordsHandler: RouteHandler<typeof getTimerRecordsRoute, Env> = async (c) => {
  try {
    const payload = c.get('idTokenPayload');
    const year = parseInt(c.req.param('year'));
    const month = parseInt(c.req.param('month'));

    const timerRecords = await getTimerRecords(payload.sub, year, month);

    return c.json(timerRecords, 200);
  } catch (error) {
    return c.json({ message: 'Internal server error occurred while getting timer records' }, 500);
  }
};
