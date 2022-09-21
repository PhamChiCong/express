/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ExtendRequest, ExtendResponse } from '../helpers/express.extends';
import { HTTP_STATUS } from '../constants/global.constant';
import { Exception } from '../interfaces/common.interface';

export const errorHandler = (err: Exception, req: ExtendRequest, res: ExtendResponse, next) => {
  if (err.name === 'ValidationError') {
    return res.status(HTTP_STATUS.VALIDATION_ERROR).json({
      success: false,
      error: {
        code: HTTP_STATUS.VALIDATION_ERROR,
        message: err.details[0].message,
      },
    });
  }

  const code = Object.values(HTTP_STATUS).includes(err.code) ? err.code : HTTP_STATUS.INTERNAL_ERROR;
  return res.status(code).json({
    success: false,
    error: {
      code,
      message: err.message,
      ...err,
      error_code: err.error_code || 'INTERNAL_SERVER_ERROR',
    },
  });
};
