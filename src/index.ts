import { config as dotEnvConfig } from 'dotenv';

import app from './app';
import { logger } from './utils/system';

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'lcl';

if (!['prod', 'stg', 'dev', 'lcl'].includes(NODE_ENV)) {
  logger.error('ENV only prod, stg, dev, and lcl');
  process.exit();
}

dotEnvConfig({ path: `./env/${process.env.NODE_ENV || 'lcl'}.env` });

export const getEnv = (keyEnv: string, defaultValue? : any) => {
  try {
    const value = process.env[keyEnv] || defaultValue;

    if (!value) {
      throw new Error(`Key env: ${keyEnv} not set value`);
    }

    return value;
  } catch (error) {
    throw error;
  }
};

global.getEnv = getEnv;

(async () => {
  try {
    await app.init();

    app.start(+process.env.PORT);
  } catch (error) {
    console.log('LISTEN ERROR:', error);
  }
})();
