import { LOGICAL_ERRORS } from '../constants/logical.error.constant';
import { ExtendRequest, ExtendResponse, NextFunction } from '../helpers/express.extends';
import { verifyJwtToken } from '../helpers/jwt.helper';
import { UserModel } from '../models/user';

export const auth = async (req: ExtendRequest, res: ExtendResponse, next: NextFunction) => {
  try {
    req.policy = { user: null };

    const authorization: string = req.headers['authorization'] || '';
    const token: string = authorization.replace('Bearer', '').trim() || req.cookies.access_token;

    if (!token) {
      throw LOGICAL_ERRORS.UNAUTHORIZED_ERROR;
    }

    const payload = await verifyJwtToken(token);

    const currentUser = await UserModel.findById(payload.user_id, '-password');

    req.policy.user = currentUser;
  } catch (err) {
    return next(LOGICAL_ERRORS.TOKEN_INVALID_ERROR);
  }
  return next();
};
