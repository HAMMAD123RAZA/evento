// user: '01hammadraza@gmail.com', 
// pass:'wsqs mwzw sacu liih'



import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

import dotenv from 'dotenv'

dotenv.config();
const sql = neon(process.env.sql);

// Configure your email provider
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email service
  auth: {
    user: '01hammadraza@gmail.com', // Replace with your email
    pass: 'wsqs mwzw sacu liih' // Replace with your app password
  }
});

// Send verification email
export const sendEmailVerification = async (req, res) => {
  const { email } = req.body;
  
  try {
    // Check if user exists
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const user = users[0];
    
    // Generate verification token (random string)
    const verificationToken = crypto.randomBytes(32).toString('hex');
    
    // Set token expiry (24 hours from now)
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 24);
    
    // Save token and expiry in database
    await sql`
      UPDATE users 
      SET verification_token = ${verificationToken}, 
          token_expiry = ${tokenExpiry} 
      WHERE id = ${user.id}
    `;
    
    // Create verification URL
    const verificationUrl = `http://localhost:5173/verify-email?token=${verificationToken}`;
    
    // Email content
    const mailOptions = {
      from: '01hammadraza@gmail.com',
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <h1>Email Verification</h1>
        <p>Hi ${user.name},</p>
        <p>Thanks for registering! Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Verification email sent successfully. Please check your inbox.'
    });
    
  } catch (error) {
    console.error('Error sending verification email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error sending verification email', 
      error: error.message 
    });
  }
};

// Verify email with token
export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  
  if (!token) {
    return res.status(400).json({ 
      success: false, 
      message: 'Verification token is required'
    });
  }
  
  try {
    // Check if the token exists and is not expired
    const users = await sql`
      SELECT * FROM users 
      WHERE verification_token = ${token} 
      AND token_expiry > NOW()
    `;
    
    if (users.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired verification token'
      });
    }
    
    const user = users[0];
    
    // Check if already verified
    if (user.is_verified) {
      return res.status(200).json({ 
        success: true, 
        message: 'Email already verified. You can now log in.'
      });
    }
    
    // Only update is_verified to true, keep the token and expiry
    await sql`
      UPDATE users 
      SET is_verified = true
      WHERE id = ${user.id}
    `;
    
    // Respond with success
    res.status(200).json({ 
      success: true, 
      message: 'Email verified successfully. You can now log in.'
    });
    
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error verifying email', 
      error: error.message 
    });
  }
};