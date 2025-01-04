import { OpenAPIHono } from '@hono/zod-openapi';
import { Env } from '../../index';
import { auth } from '../../middlewares/auth';
import { postStartTimerHandler, postStartTimerRoute } from './postStartTimer';

export const timerApi = new OpenAPIHono<Env>();
timerApi.use(async (c, next) => {
  return auth(c, next);
});
timerApi.openapi(postStartTimerRoute, postStartTimerHandler);
