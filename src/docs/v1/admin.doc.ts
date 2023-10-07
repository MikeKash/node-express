import { z } from 'zod';
import { registry } from '../../config/swagger';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

registry.registerPath({
  method: 'get',
  path: '/admin',
  security: [{ bearerAuth: [] }],
  description: 'Admin route',
  tags: ['Admin'],
  responses: {
    200: {
      description: 'Hello Admin!',
      content: {
        'application/json': {
          schema: z
            .object({
              ok: z.string(),
            })
            .openapi('Admin'),
        },
      },
    },
  },
});
