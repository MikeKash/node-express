import config from '../config';
import { logger } from '../config/logger';

const createErrorResponse = (statusCode: number, message: string) => ({
  statusCode,
  body: config.env !== 'production' ? message : undefined,
});

const getErrorMessage = (error: Error | string) => {
  if (error instanceof Error) {
    return error.message;
  }
  return error.toString();
};

const errorHandler = (error, _, response, next) => {
  try {
    const errorMessage = getErrorMessage(error);
    logger.error(errorMessage);

    if (response.headersSent) {
      return next(error);
    }

    const statusCode = error.status || error.statusCode || response.statusCode || 500;
    const errorResponse = createErrorResponse(statusCode, errorMessage);

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
  } catch (err) {
    // Handle errors that occur during error handling
    logger.error('An error occurred in the error handler:', err);
    next(err); // Pass the error to the global error handler
  }
};

export { errorHandler };
