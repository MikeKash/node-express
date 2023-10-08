import config from './config';
import { createServer } from './server';

const app = createServer();

// set home route
app.get('/', (_, res) => res.send({ ok: true }));

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
