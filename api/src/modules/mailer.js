const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;

const transport = nodemailer.createTransport({
  host,
  port,
  service: '',
  secure: false,
  auth: { user, pass},
  tls:{
    rejectUnauthorized: false
  }
});

module.exports = transport;