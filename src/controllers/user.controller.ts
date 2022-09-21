import { ExtendRequest, ExtendResponse, NextFunction } from '../helpers/express.extends';
import { auth } from '../middlewares/auth.middleware';
import * as UserValidator from '../middlewares/validations.middleware/user';
import { UserService } from '../services/user.service';
import { logger } from '../utils/system';

const UserController = require('express').Router();
UserController.base = 'user';

/**
 * @description API setup email
 */
UserController.post('/setup-email', [auth, UserValidator.setupEmailValidator], async (req: ExtendRequest, res: ExtendResponse, next: NextFunction) => {
  try {
    const userService = new UserService(req.policy.user);
    const result = await userService.setupEmail(req.body);

    res.success(result);
  } catch (error) {
    logger.error('Api user setup email', error);
    next(error);
  }
});

/**
 * @description API confirm email
 */
UserController.get('/confirm-email/:token', async (req: ExtendRequest, res: ExtendResponse, next: NextFunction) => {
  try {
    const userService = new UserService();
    const result = await userService.confirmSetUpEmail(req.params.token);

    res.success(result);
  } catch (error) {
    logger.error('Api confirm email', error);
    next(error);
  }
});

/**
 * @description API reset password
 */
UserController.post('/reset-password', [auth, UserValidator.resetPasswordlValidator], async (req: ExtendRequest, res: ExtendResponse, next: NextFunction) => {
  try {
    const userService = new UserService(req.policy.user);
    const result = await userService.resetPassword(req.body);

    res.success(result);
  } catch (error) {
    logger.error('Api reset password', error);
    next(error);
  }
});

/**
 * @description API get user infor
 */
UserController.get('/infor', [auth], async (req: ExtendRequest, res: ExtendResponse, next: NextFunction) => {
  try {
    const userService = new UserService(req.policy.user);
    const result = await userService.getUserInfor();

    res.success(result);
  } catch (error) {
    logger.error('Api get user infor', error);
    next(error);
  }
});

export { UserController };
