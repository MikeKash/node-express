import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import config from './config';
import { isTestEnv } from './utils/utils';

import routesV1 from './routes/v1';

const app = express();

// set security HTTP headers
app.use(helmet());

// Transforms the raw string of req.body into json
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// It shows the real origin IP in the heroku or Cloudwatch logs
app.enable('trust proxy');

// Function to serve all static files
app.use('/public', express.static('public'));

// enable additional headers
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// enable cors
app.use(
  cors({
    origin: (origin, callback) => {
      if (isTestEnv || (origin && config.corsAllowedHosts.includes(new URL(origin).host))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  }),
);

// set home route
app.get('/', (_, res) => res.send({ ok: true }));

//routes
app.use('/v1', routesV1);

const start = () => {
  try {
    app.listen(config.port, () => {
      console.log('Server is running on port', config.port);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
start();
