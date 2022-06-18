require("dotenv").config();
const sgMail = require("@sendgrid/mail");

// const { SENDGRID_API_KEY } = process.env;

const msg = (email, verificationToken) => {
  return {
    to: email,
    subject: "Підтвердження реєстрації",
    html: `<a target="_blank" href="http://localhost:4000/api/auth/verify/${verificationToken}">НАТИСНІТЬ ДЛЯ ПІДТВЕРДЖЕННЯ ВАШОЇ ЕЛЕКТРОННОЇ АДРЕСИ </a>`,
  };
};

sgMail.setApiKey(SENDGRID_API_KEY.process.env);

const sendEmail = (msg) => {
  const email = { ...msg, from: "slim.mom.server@gmail.com" };
  sgMail
    .send(email)
    .then(() => {
      return true;
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  msg,
  sendEmail
};
