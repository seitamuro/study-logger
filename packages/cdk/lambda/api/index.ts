import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { echoApi } from './echo';
import { helloApi } from './hello';
import { helloAuthApi } from './hello-auth';

export const api = new OpenAPIHono();

api.openAPIRegistry.registerComponent('securitySchemes', 'Authorization', {
  name: 'Authorization',
  in: 'header',
  type: 'apiKey',
  bearerFormat: 'JWT',
  description: 'idToken',
});
api
  .route('/hello', helloApi)
  .route('/hello-auth', helloAuthApi)
  .route('/echo', echoApi)
  .doc('/specification', {
    openapi: '3.0.3',
    info: {
      title: 'API',
      version: '1.0.0',
    },
  } as any)
  .get(
    '/doc',
    swaggerUI({
      url: '/api/specification',
    })
  );
