const express = require("express");
import "../../docs/v1/auth.doc";
import authController from "../../controllers/auth.controller";

const router = express.Router();

router.route("/auth").post(authController.authorize);

export default router;
