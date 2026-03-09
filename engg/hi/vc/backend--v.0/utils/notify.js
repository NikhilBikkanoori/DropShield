
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
let transporter = null;
try {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
} catch (e) { console.warn('Email not configured'); }

exports.sendEmail = async (to, subject, text) => {
  if (!transporter) return Promise.resolve(null);
  const mailOptions = { from: process.env.EMAIL_USER, to, subject, text };
  return transporter.sendMail(mailOptions);
};

// SMS: optional; if Twilio not configured, resolve null
exports.sendSMS = async (to, body) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    if (!accountSid || !authToken) return Promise.resolve(null);
    const client = require('twilio')(accountSid, authToken);
    return client.messages.create({ from: process.env.TWILIO_FROM, to, body });
  } catch (e) { return Promise.resolve(null); }
};
