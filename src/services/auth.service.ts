import { LOGICAL_ERRORS } from '../constants/logical.error.constant';
import { comparePassword, hashPassword } from '../helpers/encryption';
import { makeJwtToken } from '../helpers/jwt.helper';
import { UserModel } from '../models/user';
import { logger } from '../utils/system';

export class AuthService {
  /**
   * @description User registration
   * @param email
   * @param password
   * @param username
   * @param firstname
   * @param lastname
   */
  static async userRegister({
    email,
    password,
    username,
    firstname,
    lastname
  }: {
    email: string,
    password: string,
    username: string,
    firstname: string,
    lastname: string,
  }): Promise<InstanceType<typeof UserModel>> {
    try {
      const user = await UserModel.findOne({ email });

      if (user && user.is_activated) {
        throw new Error('Email exist in system!')
      }

      const hassPassword = await hashPassword(password);

      const newUser = await UserModel.create({
        email,
        password: hassPassword,
        username,
        firstname,
        lastname,
      })

      return newUser;
    } catch (error) {
      logger.error('AuthService userRegister', error);
      throw error;
    }
  }

  /**
  * @description Login by email password
  * @param email
  * @param password
  */
  static async login({ email, password }: { email: string, password: string }): Promise<{ token, expired, user: any }> {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        throw LOGICAL_ERRORS.NOT_FOUND_ERROR;
      }

      const checkPassword = await comparePassword(password, user.password);
      if (!checkPassword) {
        throw new Error('Username or password invlid');
      }

      const result = await makeJwtToken({
        user_id: user._id,
        public_address: user._id,
      }, +process.env.JWT_EXPIRES_IN_HOUR);

      user.password = undefined;
      return {
        ...result,
        user,
      };
    } catch (error) {
      logger.error('AuthService login', error);
      throw error;
    }
  }
}
