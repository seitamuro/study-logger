import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { helloApi } from './hello';

export const api = new OpenAPIHono();

api
  .route('/hello', helloApi)
  .doc('/specification', {
    openapi: '3.0.3',
    info: {
      title: 'API',
      version: '1.0.0',
    },
  })
  .get(
    '/doc',
    swaggerUI({
      url: '/api/specification',
    })
  );
