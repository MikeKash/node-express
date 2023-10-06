import { z } from "zod";
import { registry } from "../../config/swagger";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

registry.registerPath({
  method: "post",
  path: "/auth",
  description: "Auth route",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({ username: z.string(), password: z.string() }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Get Access Token",
      content: {
        "application/json": {
          schema: z
            .object({
              token: z.string(),
            })
            .openapi("Auth"),
        },
      },
    },
  },
});
