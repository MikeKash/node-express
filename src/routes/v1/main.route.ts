import mainController from "../../controllers/main.controller";
const express = require("express");

const router = express.Router();

router.route("/main").get(mainController.getHelloWorld);

export default router;
