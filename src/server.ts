import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routesV1 from './routes/v1';
import { isTestEnv } from './utils/utils';
import config from './config';

export const createServer = () => {
  const server = express();

  // set security HTTP headers
  server.use(helmet());

  // Transforms the raw string of req.body into json
  server.use(express.json());

  // parse urlencoded request body
  server.use(express.urlencoded({ extended: true }));

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  server.enable('trust proxy');

  // Function to serve all static files
  server.use('/public', express.static('public'));

  // enable additional headers
  server.use((_, res, next) => {
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

  // enable cors
  server.use(
    cors({
      credentials: true,
      origin: (origin, callback) => {
        if (isTestEnv || (origin && config.corsAllowedHosts.includes(new URL(origin).host))) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    }),
  );

  //routes
  server.use('/v1', routesV1);

  return server;
};
