import express from "express";
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import swaggerUi from "swagger-ui-express";
import mainRoute from "./main.route";
import { isTestEnv } from "../../utils/utils";
import { registry, swaggerDef } from "../../config/swagger";

const router = express.Router();

const routes = [mainRoute];
routes.forEach((route) => {
  router.use(route);
});

if (isTestEnv) {
  registry.registerComponent("securitySchemes", "bearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  });

  const generator = new OpenApiGeneratorV3(registry.definitions);

  router.use(
    "/api-docs",
    (req, _, next) => {
      req.swaggerDoc = generator.generateDocument(
        swaggerDef(`${req.protocol}://${req.get("host")}`)
      );
      console.log("req.swaggerDoc", req.swaggerDoc);
      next();
    },
    swaggerUi.serve,
    swaggerUi.setup()
  );
}

export default router;
