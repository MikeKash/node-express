import ApiError from './ApiError';

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    const statusCode = err.response?.status || err.response?.statusCode;

    return next(new ApiError(statusCode, err.response?.statusText, err.stack));
  });
};

export { catchAsync };
