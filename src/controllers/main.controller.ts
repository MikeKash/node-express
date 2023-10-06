import mainService from "../services/main.service";

export const getHelloWorld = (reg, res) => {
  const response = mainService.getHelloWorld();
  return res.send({ ok: response });
};

const mainController = { getHelloWorld };

export default mainController;
