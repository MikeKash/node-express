import httpStatus from 'http-status';
import adminService from '../services/admin.service';

export const getSecret = (reg, res) => {
  const response = adminService.getSecret();
  return res.status(httpStatus.OK).send({ ok: response });
};

const adminController = { getSecret };

export default adminController;
