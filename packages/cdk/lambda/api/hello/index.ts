import { OpenAPIHono } from '@hono/zod-openapi';
import { getHelloHandler, getHellRoute } from './getHello';

export const helloApi = new OpenAPIHono();
helloApi.openapi(getHellRoute, getHelloHandler);
