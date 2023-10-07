import config from '../config';
import authService from '../services/auth.service';
import userService from '../services/user.service';

export const authorize = (req, res) => {
  const { username, password } = req.body;
  const user = userService.getUser(username);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  //just for testing
  const hasedPswrd = authService.passwordHash(password);

  // validate the password
  const validPassword = authService.comparePassword(password, hasedPswrd);
  if (!validPassword) {
    return res.status(401).send({ message: 'Wrong Password' });
  }

  const token = authService.generateAccessToken(username, config.tokenKey);
  return res.send({ token });
};

const authController = { authorize };

export default authController;
