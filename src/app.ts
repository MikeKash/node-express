import config from './config';
import { logger } from './config/logger';
import { createServer } from './server/server';

const app = createServer();

// set home route
app.get('/', (_, res) => res.send({ ok: true }));

const start = () => {
  try {
    app.listen(config.port, () => {
      logger.info('Server is running on port', config.port);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};
start();
