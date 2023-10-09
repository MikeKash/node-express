import httpStatus from 'http-status';
import mainService from '../services/main.service';

export const getHelloWorld = (reg, res) => {
  const response = mainService.getHelloWorld();
  return res.status(httpStatus.OK).send({ ok: response });
};

const mainController = { getHelloWorld };

export default mainController;
