import jwt from 'jsonwebtoken';
import config from '../config';

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const bearer = authHeader.match(/Bearer (.+)/)?.[1];

  if (!bearer) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const user = jwt.verify(bearer, config.tokenKey);
    req.user = user;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

export default auth;
