import config from './config';
import { logger } from './config/logger';
import { createServer } from './server/server';

const app = createServer();

// set home route
app.get('/', (_, res) => res.send({ ok: true }));

const start = () => {
  const port = config.port;
  try {
    app.listen(port, () => {
      logger.info('Server is running: ', { port });
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};
start();
