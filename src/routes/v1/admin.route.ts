import adminController from "../../controllers/admin.controller";
import auth from "../../middleware/auth";
const express = require("express");
import "../../docs/v1/admin.doc";

const router = express.Router();

router.route("/admin").get(auth, adminController.getSecret);

export default router;
