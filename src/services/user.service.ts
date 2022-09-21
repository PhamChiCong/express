import { LOGICAL_ERRORS } from '../constants/logical.error.constant';
import { Email } from '../helpers/email.helper';
import { hashPassword } from '../helpers/encryption';
import { makeJwtToken, verifyJwtToken } from '../helpers/jwt.helper';
import { UserModel } from '../models/user';
import { logger } from '../utils/system';

export class UserService {
  public currentUser: InstanceType<typeof UserModel>;

  constructor(currentUser?: InstanceType<typeof UserModel>) {
    this.currentUser = currentUser;
  }

  /**
   * @description Setup email
   * @param email
   * @param password
   */
  public async setupEmail({ email, password }: { email: string, password: string }): Promise<InstanceType<typeof UserModel>> {
    try {
      if (this.currentUser.is_activated) {
        throw LOGICAL_ERRORS.EMAIL_VERIFED;
      }

      const isDuplicaEmail = await UserModel.findOne({
        email,
        _id: { $ne: this.currentUser._id },
      });

      if (isDuplicaEmail) {
        throw LOGICAL_ERRORS.DUPLICA_EMAIL;
      }

      const result = await makeJwtToken({ email, password, user_id: this.currentUser.id }, +process.env.EXPIRED_CONFIRM_EMAIL_CODE);
      await Email.sendEmail({
        toEmails: [email],
        subject: 'Confirm email',
        templateName: 'confirm.email.template',
        params: {
          email,
          url: `${process.env.DOMAIN_USER}/account?code=${result.token}`,
        },
      });

      await this.currentUser.update({ email });
      return this.currentUser;
    } catch (error) {
      logger.error('UserService setupEmail', error);
      throw error;
    }
  }

  /**
 * @description Reset password
 * @param password
 */
  public async resetPassword({ password }: { password: string }): Promise<InstanceType<typeof UserModel>> {
    try {
      if (!this.currentUser.is_activated) {
        throw LOGICAL_ERRORS.EMAIL_IS_NOT_VERIFED;
      }

      const result = await makeJwtToken({ email: this.currentUser.email, password, user_id: this.currentUser.id }, +process.env.EXPIRED_CONFIRM_EMAIL_CODE);
      await Email.sendEmail({
        toEmails: [this.currentUser.email],
        subject: 'Confirm email',
        templateName: 'confirm.email.template',
        params: {
          email: this.currentUser.email,
          url: `${process.env.DOMAIN_USER}/account?code=${result.token}`,
        },
      });

      return this.currentUser;
    } catch (error) {
      logger.error('UserService resetPassword', error);
      throw error;
    }
  }

  public async confirmSetUpEmail(token: string): Promise<InstanceType<typeof UserModel>> {
    try {
      const { email, user_id, password } = await verifyJwtToken(token);

      let user = await UserModel.findById(user_id, '-password');

      if (!user) {
        throw LOGICAL_ERRORS.NOT_FOUND_ERROR;
      }

      const isDuplicaEmail = await UserModel.findOne({
        email,
        _id: { $ne: user._id },
      });

      if (isDuplicaEmail) {
        throw LOGICAL_ERRORS.DUPLICA_EMAIL;
      }

      const newHashPassword = await hashPassword(password);
      await user.update({ is_activated: true, password: newHashPassword, email });

      user = await UserModel.findById(user_id, '-password');

      return user;
    } catch (error) {
      logger.error('UserService confirmEmail', error);
      throw error;
    }
  }

  /**
   * @description Get user infor
   */
  public async getUserInfor(): Promise<InstanceType<typeof UserModel>> {
    try {
      const data = await UserModel.findById(this.currentUser._id, '-password');

      return data;
    } catch (error) {
      logger.error('UserService getUserInfor', error);
      throw error;
    }
  }
}
