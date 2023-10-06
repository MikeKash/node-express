import mainController from "../../controllers/main.controller";
const express = require("express");
import "../../docs/v1/main.doc";

const router = express.Router();

router.route("/main").get(mainController.getHelloWorld);

export default router;
