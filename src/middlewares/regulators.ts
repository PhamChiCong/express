import { logger } from '../utils/system';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { JOI_DEFAULT_CONFIG } from './validations.middleware/validator';
const requestLogger = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].indexOf(req.method) >= 0) {
      logger.info(req.url);
    }
    next();
  };
};

const paginationHandle = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schemaPagination = Joi.object({
        page: Joi.number().min(1).default(1),
        limit: Joi.number().min(1).default(10),
      });

      const { page, limit } = await schemaPagination.validateAsync(req.query, {
        ...JOI_DEFAULT_CONFIG,
        allowUnknown: true,
      });

      const offset: any = (page - 1) * (limit);

      req.query = {
        ...req.query,
        offset,
        page,
        limit,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};

const regulators = [
  requestLogger(),
  paginationHandle(),
];

export {
  regulators,
};
