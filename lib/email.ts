import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email: string, otp: string): Promise<boolean> => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`\n=== OTP EMAIL ===`);
      console.log(`Email: ${email}`);
      console.log(`OTP Code: ${otp}`);
      console.log(`================\n`);
    }

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && 
        process.env.EMAIL_USER !== 'your-email@gmail.com') {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'School Management - Email Verification OTP',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; text-align: center;">Email Verification</h2>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; text-align: center;">
              <p style="font-size: 16px; color: #666;">Your verification code is:</p>
              <h1 style="color: #007bff; font-size: 32px; margin: 20px 0;">${otp}</h1>
              <p style="font-size: 14px; color: #888;">This code will expire in 5 minutes.</p>
            </div>
          </div>
        `,
      };
      await transporter.sendMail(mailOptions);
    }
    
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
};