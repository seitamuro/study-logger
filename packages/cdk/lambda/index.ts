import { CognitoIdTokenPayload } from 'aws-jwt-verify/jwt-model';
import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { auth } from './middlewares/auth';

import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { api } from './api';

type Env = {
  Variables: {
    idTokenPayload: CognitoIdTokenPayload;
  };
};

export const app = new Hono<Env>();

app.use('*', logger());
app.use('*', cors());
app.use('*', prettyJSON());

app.get('/hello', (c) => {
  return c.text('Hello, World!');
});

app.get('/hello-auth', auth, (c) => {
  return c.text('Hello, Authenticated World!');
});

app.post('/timer/start', auth, async (c) => {
  const payload = c.get('idTokenPayload');

  //let body;
  const body = await c.req.json();
  try {
    const _body = await c.req.json();
    //body = postStartTimerSchema.parse(_body);
  } catch (e) {
    console.error(e);
    return c.json({ message: JSON.stringify(e) }, 400);
  }

  const client = new DynamoDBClient({});

  const params = {
    TableName: process.env.TIMER_TABLE_NAME,
    Key: {
      userId: { S: payload.sub },
      timestamp: { S: new Date().toISOString() },
    },
    UpdateExpression: 'SET #status = :status, #duration = :duration',
    ExpressionAttributeNames: { '#status': 'status', '#duration': 'duration' },
    ExpressionAttributeValues: {
      ':status': { S: 'running' },
      ':duration': { N: `${body.duration}` },
    },
  };
  const command = new UpdateItemCommand(params);
  try {
    await client.send(command);
  } catch (e) {
    console.error(e);
    return c.json({ message: 'Failed to start timer' }, 500);
  }

  console.log('Starting timer');
  return c.json({ message: `Timer started. Your sub is ${payload.sub}` });
});

app.get('/timer/status', auth, (c) => {
  return c.json({ status: 'running' });
});

app.post('/timer/stop', auth, (c) => {
  console.log('Stopping timer');
  return c.json({ message: 'Timer stopped' });
});

app.post('/echo', async (c) => {
  const body = await c.req.json();
  console.log(body);
  return c.json({ youSaid: body });
});

app.get('/time', (c) => {
  return c.json({ time: new Date().toISOString() });
});

app.route('/api', api);

export const handler = handle(app);
