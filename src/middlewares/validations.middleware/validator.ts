import Joi, { AsyncValidationOptions, ObjectSchema } from 'joi';
import { ExtendRequest, ExtendResponse, NextFunction } from '../../helpers/express.extends';

export const JOI_DEFAULT_CONFIG: AsyncValidationOptions = {
  abortEarly: false,
  allowUnknown: false,
  errors: {
    label: 'key',
    wrap: {
      label: '',
    },
  },
};

export const requestProperties = Object.freeze({
  BODY: 'body',
  PARAMS: 'params',
  QUERY: 'query',
  PRINCIPAL: 'principal',
  POLICY: 'policy',
});

export const validator = (schema: ObjectSchema, property: any) => {
  return async (req: ExtendRequest, res: ExtendResponse, next: NextFunction) => {
    try {
      schema = schema.append({ offset: Joi.number() });
      const data = await schema.validateAsync(req[property], JOI_DEFAULT_CONFIG);

      req[property] = {
        ...req[property],
        ...data,
      };

      next();
    }
    catch (err) {
      next(err);
    }
  };
};
