import { requestProperties, validator } from './validator';
import Joi from 'joi';

export const registerValidator = validator(Joi.object({
  email: Joi.string().required().email().trim().min(5).max(50),
  password: Joi.string().required().trim().min(6),
  username: Joi.string().required().trim().min(5).max(30),
  firstname: Joi.string().required().trim().min(2).max(30),
  lastname: Joi.string().required().trim().min(2).max(30),
}), requestProperties.BODY);

export const loginValidator = validator(Joi.object({
  email: Joi.string().required().email().trim().min(5).max(50),
  password: Joi.string().required().trim().min(6),
}), requestProperties.BODY);
