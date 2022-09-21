import { ExtendRequest, ExtendResponse, NextFunction } from '../helpers/express.extends';
import { AuthService } from '../services/auth.service';
import { logger } from '../utils/system';
import * as AuthValidator from '../middlewares/validations.middleware/auth';

const AuthController = require('express').Router();
AuthController.base = 'auth';

/**
 * @description API login by email password
 */
AuthController.post('/login', [AuthValidator.loginValidator], async (req: ExtendRequest, res: ExtendResponse, next: NextFunction) => {
  try {
    const result = await AuthService.login(req.body);

    res.cookie('access_token', result.token);

    res.success(result);
  } catch (error) {
    logger.error('Api /login', error);
    next(error);
  }
});

/**
 * @description API user register new account
 */
 AuthController.post('/register', [AuthValidator.registerValidator], async (req: ExtendRequest, res: ExtendResponse, next: NextFunction) => {
  try {
    const result = await AuthService.userRegister(req.body);

    res.success(result);
  } catch (error) {
    logger.error('Api /register', error);
    next(error);
  }
});


export { AuthController };
