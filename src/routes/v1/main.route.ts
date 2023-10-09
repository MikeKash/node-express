import mainController from '../../controllers/main.controller';
const express = require('express');
import '../../docs/v1/main.doc';
import { catchAsync } from '../../utils/catchAsync';

const router = express.Router();

router.route('/main').get(catchAsync(mainController.getHelloWorld));

export default router;
