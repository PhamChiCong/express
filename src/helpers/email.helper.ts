import AWS from 'aws-sdk';
import path from 'path';
const ejs = require('ejs');

const getDataAWS = () => {
  const NODE_ENV = process.env.NODE_ENV || 'lcl';
  let awsConfig: any = {
    region: process.env.SES_REGION,
  };

  if (NODE_ENV === 'lcl') {
    awsConfig = {
      accessKeyId: process.env.SES_KEY,
      secretAccessKey: process.env.SES_SECRET,
      region: process.env.SES_REGION,
    };
  }

  AWS.config.update(awsConfig);
};

const emailTemplatePath = path.join(__dirname, '../public/email-template');

export const renderEmailContent = ({ templateName, params }) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(`${emailTemplatePath}/${templateName}.ejs`, params, function(err, content) {
      if (err) {
        return reject(err);
      }
      return resolve(content);
    });
  });
};

class Email {
  public static SES;
  public static MAX_EMAIL;
  public static MAILS_LENGTH_DELAY;

  /**
   * @description Sending mail using SES AWS
   * @param {String[]} toEmails Receivers
   * @param {String[]} ccEmails ccReceivers
   * @param {String[]} bccEmails ccReceivers
   * @param {String} subject subject
   * @param {String} templateName templateName
   * @param {Object} params params pass to email template ejs
   */
  static async sendEmail({
    toEmails = [],
    ccEmails = [],
    bccEmails = [],
    subject,
    templateName,
    params,
  }) {
    try {
      getDataAWS();
      this.SES = new AWS.SES();
      this.MAX_EMAIL = 50;
      this.MAILS_LENGTH_DELAY = 1000;

      /** Define sendEmailRequest send email */
      const sendEmailRequest = {
        Destination: {
          CcAddresses: ccEmails,
          BccAddresses: bccEmails,
          ToAddresses: toEmails,
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: await renderEmailContent({ templateName, params }),
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject,
          },
        },
        Source: process.env.SYSTEM_EMAIL_ADDRESS,
      };

      const toEmailsValid = Array.isArray(toEmails) && toEmails.length > 0 && toEmails;
      const toBccEmailsValid = Array.isArray(bccEmails) && bccEmails.length > 0 && bccEmails;
      /** Save address of point of toEmailsValid or toBccEmailsValid */
      let cloneEmails = [...(toEmailsValid || toBccEmailsValid)];
      while (cloneEmails.length > 0) {
        /** Can not handle case send both toEmails and bccEmails */
        if (!toBccEmailsValid || !toBccEmailsValid) {
          const emailSends = cloneEmails.slice(0, this.MAX_EMAIL - 1);
          cloneEmails = cloneEmails.slice(this.MAX_EMAIL, cloneEmails.length);

          if (toEmailsValid) {
            sendEmailRequest.Destination.ToAddresses = emailSends;
          }

          if (toBccEmailsValid) {
            sendEmailRequest.Destination.BccAddresses = emailSends;
          }
        } else {
          cloneEmails = [];
        }

        await this.SES.sendEmail(sendEmailRequest).promise();
        /** Waiting for new mails */
        if (cloneEmails.length > 0) {
          await new Promise(resolve => setTimeout(resolve, this.MAILS_LENGTH_DELAY));
        }
      }

    } catch (error) {
      throw error;
    }
  }

}

export { Email };
