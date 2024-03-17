const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
 service:'gmail',
  auth: {
    user: process.env.SMTP_mail,
    pass: process.env.SMTP_pass,
  },
});  

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for sending emails");
    console.log(success);
  }
});

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const sendEmailVerification = async (email,otp) => {

  const mailOtp = {
    from: process.env.SMTP_mail,
    to: email,
    subject: 'OTP for verification',
    text: `Your OTP for verification is ${otp}. This will expire in 2 minutes`,
  };

  try {
    const info = await transporter.sendMail(mailOtp);
    console.log('Email sent:', info.response);
    return otp; 
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; 
  }
};

module.exports = {
  generateOtp,
  sendEmailVerification
};
