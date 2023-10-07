import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { version } from '../../package.json';

const swaggerDef = (host?: string) => ({
  openapi: '3.0.0',
  info: {
    title: 'Express API with Swagger',
    version,
  },
  servers: [
    {
      url: '{baseUrl}/v1',
      variables: {
        baseUrl: {
          default: host || 'http://localhost:8000',
        },
      },
    },
  ],
});

const registry = new OpenAPIRegistry();

export { registry, swaggerDef };
