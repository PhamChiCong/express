import moment from 'moment/moment';
import winstonLb from 'winston';
import { DATE_TIME_STRING_FORMAT } from '../constants/global.constant';
import { winstonLogger } from './winston';

/** Define group log */
const logAttribute = {
  group: { order: 'order', estimation: 'estimation', mail: 'mail' },
  action: { create: 'create' },
  prefix: { admin: 'admin', user: 'user' },
  type: { info: 'info', error: 'error' },
};

/** Config logger */
const configLogger = ({
  data, group, action, prefix, type,
}) => {
  try {
    if (group && action && prefix && type) {
      const isInValidParams = !logAttribute.group[group]
        || !logAttribute.action[action]
        || !logAttribute.prefix[prefix]
        || !logAttribute.type[type];

      if (isInValidParams) {
        console.log('[LOGGER] Group log is invalid!');
        return;
      }

      const date = moment().format('YYYY-MM-DD');
      const filename = `${process.env.PATH_LOG}/${prefix}/${type}/${group}/${action}/${date}.log`;

      const fileLogger = winstonLb.createLogger({
        transports: [
          new (winstonLb.transports.File)({
            filename,
            // colorize: true,
          }),
        ],
        exitOnError: false,
      });

      data = type === logAttribute.type.error ? { name: data.name, message: data.message } : data;
      fileLogger[type]({ time: moment(), data });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const logger = {
  warn: (message) => {
    return winstonLogger.warn(`${moment().format(DATE_TIME_STRING_FORMAT)} ==> ${message}`);
  },
  error: (message: string, error: any = '', attr = null) => {
    /** Write log */
    configLogger({ ...attr, data: error, type: logAttribute.type.error });

    const messageError = error && error.message ? error.message : error;

    console.log(error);

    return winstonLogger.error(`${moment().format(DATE_TIME_STRING_FORMAT)} ==> ${message}: ${messageError}`);
  },
  info: (message, attr?) => {
    /** Write log */
    configLogger({ ...attr, type: logAttribute.type.info });
    return winstonLogger.info(`${moment().format(DATE_TIME_STRING_FORMAT)} ==> ${message}`);
  },
};

export {
  logger,
};
