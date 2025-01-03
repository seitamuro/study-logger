import { CognitoIdTokenPayload } from 'aws-jwt-verify/jwt-model';
import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { auth } from './middlewares/auth';

type Env = {
  Variables: {
    idTokenPayload: CognitoIdTokenPayload;
  };
};

export const app = new Hono<Env>();

app.use('*', logger());
app.use('*', cors());

app.get('/hello', (c) => {
  return c.text('Hello, World!');
});

app.get('/hello-auth', auth, (c) => {
  return c.text('Hello, Authenticated World!');
});

app.post('/timer/start', auth, (c) => {
  const payload = c.get('idTokenPayload');
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

export const handler = handle(app);
