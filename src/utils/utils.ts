import config from '../config';

const isTestEnv = ['development', 'staging', 'test'].includes(config.env);

export { isTestEnv };
