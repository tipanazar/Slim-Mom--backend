const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = (msg) => {
    
    const email = { ...msg, from: "slim.mom.server@gmail.com" };
    sgMail.send(email)
        .then(() => {            
            return true;
        })
        .catch((error) => {
            throw error;
        });     
};

module.exports = sendEmail;