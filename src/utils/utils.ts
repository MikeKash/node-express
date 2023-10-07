import config from '../config';

const isTestEnv = ['development', 'staging'].includes(config.env);

export { isTestEnv };
