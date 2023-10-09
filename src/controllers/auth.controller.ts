import httpStatus from 'http-status';
import config from '../config';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import ApiError from '../utils/ApiError';

export const authorize = (req, res) => {
  const { username, password } = req.body;
  const user = userService.getUser(username);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  //just for testing
  const hasedPswrd = authService.passwordHash(password);

  // validate the password
  const validPassword = authService.comparePassword(password, hasedPswrd);
  if (!validPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong Password');
  }

  const token = authService.generateAccessToken(username, config.tokenKey);
  return res.status(httpStatus.OK).send({ token });
};

const authController = { authorize };

export default authController;
