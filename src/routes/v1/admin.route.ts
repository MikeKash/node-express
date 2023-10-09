import adminController from '../../controllers/admin.controller';
import auth from '../../middleware/auth';
const express = require('express');
import '../../docs/v1/admin.doc';
import { catchAsync } from '../../utils/catchAsync';

const router = express.Router();

router.route('/admin').get(auth, catchAsync(adminController.getSecret));

export default router;
