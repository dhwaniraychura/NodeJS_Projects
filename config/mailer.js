const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({

  service: 'gmail',

  auth: {
    user: process.env.MAIL_USER || 'your-email@gmail.com',
    pass: process.env.MAIL_PASS || 'your-app-password'
  }

});

module.exports = transporter;
