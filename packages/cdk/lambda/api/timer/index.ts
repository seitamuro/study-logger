import { OpenAPIHono } from '@hono/zod-openapi';
import { Env } from '../../index';
import { auth } from '../../middlewares/auth';
import { getTimerRecordsHandler, getTimerRecordsRoute } from './getTimerRecords';
import { postTimerRecordHandler, postTimerRecordRoute } from './postTimerRecord';

export const timerApi = new OpenAPIHono<Env>();
timerApi.use(async (c, next) => {
  return auth(c, next);
});
timerApi.openapi(postTimerRecordRoute, postTimerRecordHandler);
timerApi.openapi(getTimerRecordsRoute, getTimerRecordsHandler);
