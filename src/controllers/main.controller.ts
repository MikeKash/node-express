import mainService from "../services/main.service";
import "../docs/v1/main.doc";

export const getHelloWorld = (reg, res) => {
  const response = mainService.getHelloWorld();
  return res.send(response);
};

const mainController = { getHelloWorld };

export default mainController;
