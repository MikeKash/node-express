import { version } from "../../package.json";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["**/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api-docs.json", (_, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log("Docs are available on /api-docs");
};

export default swaggerDocs;
