const nodemailer = require("nodemailer");

// Create the transporter for your email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'suhansa2816@gmail.com', // Replace with your email
    pass: 'hifb jtjv jdia zdtg', // App password is here
  },
});

// Function to send an email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'suhansa2816@gmail.com', // Sender address
    to, // Recipient email address
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      resolve(info.response);
    });
  });
};

module.exports = {sendEmail,};
