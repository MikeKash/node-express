import config from '../config';
import { logger } from '../config/logger';

const getErrorMessage = (error) => {
  if (error.message) {
    return error.message;
  }

  if (typeof error.toString === 'function') {
    return error.toString();
  }

  return '';
};

/**
 * Determines if an HTTP status code falls in the 4xx or 5xx error ranges.
 * @param {number} statusCode - HTTP status code
 * @return {boolean}
 */
const isErrorStatusCode = (statusCode) => {
  return statusCode >= 400 && statusCode < 600;
};

/**
 * Look for an error HTTP status code
 * @param {Object} options
 * @param {Error} options.error
 * @param {Object} options.response - Express response object
 * @return {number} - HTTP status code
 */
function getHttpStatusCode({ error, response }) {
  const statusCodeFromError = error.status || error.statusCode;
  if (isErrorStatusCode(statusCodeFromError)) {
    return statusCodeFromError;
  }

  const statusCodeFromResponse = response.statusCode;
  if (isErrorStatusCode(statusCodeFromResponse)) {
    return statusCodeFromResponse;
  }

  return 500;
}

const errorHandler = (error, _, response, next) => {
  const errorMessage = getErrorMessage(error);

  logger.error(errorMessage);

  if (response.headersSent) {
    return next(error);
  }

  const errorResponse = {
    statusCode: getHttpStatusCode({ error, response }),
    body: undefined,
  };

  if (config.env !== 'production') {
    errorResponse.body = errorMessage;
  }

  response.status(errorResponse.statusCode);

  response.format({
    'application/json': () => {
      response.json(errorResponse.body ? { message: errorResponse.body } : undefined);
    },
    default: () => {
      response.type('text/plain').send(errorResponse.body);
    },
  });

  next();
};

export { errorHandler };
