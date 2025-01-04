import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { createRoute, RouteHandler, z } from '@hono/zod-openapi';
import { ErrorResponse, TimerRecordSchema } from 'types/models';
import { Env } from '../../index';

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
          schema: TimerRecordSchema,
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

    const timestamp = new Date().toISOString();
    const client = new DynamoDBClient({});

    const record = TimerRecordSchema.parse({
      userId: payload.sub,
      timestamp: timestamp,
      status: 'in progress',
      duration: body.duration,
    });

    const params = {
      TableName: process.env.TIMER_TABLE_NAME,
      Key: {
        userId: { S: record.userId },
        timestamp: { S: record.timestamp },
      },
      UpdateExpression: 'SET #status = :status, #duration = :duration',
      ExpressionAttributeNames: { '#status': 'status', '#duration': 'duration' },
      ExpressionAttributeValues: {
        ':status': { S: record.status },
        ':duration': { N: `${record.duration}` },
      },
    };

    const command = new UpdateItemCommand(params);
    await client.send(command);

    const timerRecord = {
      userId: payload.sub,
      timestamp: timestamp,
      status: 'in progress' as const,
      duration: body.duration,
    };

    return c.json(timerRecord, 200);
  } catch (e) {
    console.error(e);
    if (e instanceof z.ZodError) {
      return c.json({ message: 'Invalid request body' }, 400);
    }
    return c.json({ message: 'Failed to start timer' }, 500);
  }
};
