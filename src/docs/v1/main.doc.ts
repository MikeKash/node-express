import { z } from 'zod';
import { registry } from '../../config/swagger';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

registry.registerPath({
  method: 'get',
  path: '/main',
  description: 'Main route',
  tags: ['Main'],
  responses: {
    200: {
      description: 'Hello World!',
      content: {
        'application/json': {
          schema: z
            .object({
              ok: z.string(),
            })
            .openapi('Main'),
        },
      },
    },
  },
});
