import adminService from '../services/admin.service';

export const getSecret = (reg, res) => {
  const response = adminService.getSecret();
  return res.send({ ok: response });
};

const adminController = { getSecret };

export default adminController;
