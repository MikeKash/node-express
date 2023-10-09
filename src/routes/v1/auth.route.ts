const express = require('express');
import '../../docs/v1/auth.doc';
import authController from '../../controllers/auth.controller';
import { catchAsync } from '../../utils/catchAsync';

const router = express.Router();

router.route('/auth').post(catchAsync(authController.authorize));

export default router;
