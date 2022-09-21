import { requestProperties, validator } from './validator';
import Joi from 'joi';

export const getListPandaValidator = validator(Joi.object({
  page: Joi.number().required().min(1),
  limit: Joi.number().required().min(10).max(100),
  is_non_nft: Joi.boolean().default(false),
}), requestProperties.QUERY);

export const getListPandaOnMarketValidator = validator(Joi.object({
  page: Joi.number().required().min(1),
  limit: Joi.number().required().min(10).max(100),
}), requestProperties.QUERY);

export const setupEmailValidator = validator(Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6).max(100),
}), requestProperties.BODY);

export const resetPasswordlValidator = validator(Joi.object({
  password: Joi.string().required().min(6).max(100),
}), requestProperties.BODY);

export const getListActivationValidator = validator(Joi.object({
  page: Joi.number().required().min(1),
  limit: Joi.number().required().min(4).max(100),
}), requestProperties.QUERY);
