import jwt from 'jsonwebtoken';
import config from '../config';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const bearer = authHeader.match(/Bearer (.+)/)?.[1];

  if (!bearer) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'A token is required for authentication');
  }
  try {
    const user = jwt.verify(bearer, config.tokenKey);
    req.user = user;
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Token');
  }
  return next();
};

export default auth;
