
import TEMPLATES from '../templates/index.js';
const MDA_SENDER = 'MDA';


export const CONTROLLERS = {
  SEND_EMAIL: 'admin:sendEmail'
};

export const emailError = Object.freeze({
  EMAIL_NOT_SENT: {
    code: 100,
    message: 'Email not sent'
  },
  EMAIL_DETAILS_NOT_PROVIDED : {
    code: 101,
    message: 'Email details not provided'
  }
});

export const EMAIL_TEMPLATES_DETAILS = {
  VERIFY_EMAIL: {
    template: TEMPLATES.activateAccount,
    subject: 'Email Verification',
    sender: MDA_SENDER
  },
  RESET_PASSWORD: {
    template: TEMPLATES.resetPassword,
    subject: 'Reset Password',
    sender: MDA_SENDER
  }
};
