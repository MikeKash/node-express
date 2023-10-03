import mainController from "../controllers/main.controller";

const express = require("express");
const router = express.Router();

   /**
     * @swagger
     *
     * /v1/main:
     *   get:
     *     description: main route
     *     produces:
     *       - string
     *     responses:
     *       200:
     *         description: hello world
     */
router.route("/main").get(mainController.getHelloWorld);

export default router;
