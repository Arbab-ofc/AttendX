import nodemailer from 'nodemailer';

export const sendEmail = async ({ email , subject, text, html }) => {
  console.log('sendEmail called with:', { email, subject, text, html });
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email credentials are not set in environment variables');
    return false;
  }
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });
  console.log('Sending email to:', email);
  if (!email || !subject || !text) {
    console.error('Missing required email parameters');
    return false;
  }
  const mailOptions = {
    from: "🚀 AttendX Official <no-reply@attendx.com>",
    to : email,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};