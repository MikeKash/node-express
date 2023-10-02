import express from "express";

const router = express.Router();

import mainRoute from "./main";

const routes = [mainRoute];
routes.forEach((route) => {
  router.use(route);
});

export default router;
