// import { neon } from '@neondatabase/serverless';
// import nodemailer from 'nodemailer';
// import crypto from 'crypto';
 
// const sql = neon('postgresql://neondb_owner:npg_bZvVMjNr87DE@ep-purple-hall-a8y9hegq-pooler.eastus2.azure.neon.tech/neondb?sslmode=require');

// // Create email transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // You can change this based on your email provider
//   auth: {
//     user: 'your-email@gmail.com', // Replace with your email
//     pass: 'your-app-password' // Replace with your app password
//   }
// });

// // Function to generate verification token
// const generateVerificationToken = () => {
//   return crypto.randomBytes(32).toString('hex');
// };

// // Send verification email function
// export const sendEmailVerify = async (req, res) => {
//   const { email } = req.body;
  
//   try {
//     // Check if user exists
//     const users = await sql`SELECT * FROM users WHERE email = ${email}`;
//     if (users.length === 0) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }
    
//     const user = users[0];
    
//     // Generate verification token
//     const verificationToken = generateVerificationToken();
//     const tokenExpiry = new Date();
//     tokenExpiry.setHours(tokenExpiry.getHours() + 24); // Token valid for 24 hours
    
//     // Store token in database
//     await sql`
//       UPDATE users 
//       SET verification_token = ${verificationToken}, 
//           token_expiry = ${tokenExpiry},
//           is_verified = false
//       WHERE id = ${user.id}
//     `;
    
//     // Create verification URL
//     const verificationUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;
    
//     // Email content
//     const mailOptions = {
//       from: 'your-email@gmail.com',
//       to: email,
//       subject: 'Verify Your Email Address',
//       html: `
//         <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #333;">
//           <h1 style="color: #4a86e8; text-align: center;">Email Verification</h1>
//           <p>Hello ${user.name},</p>
//           <p>Thank you for registering with our service. Please verify your email address by clicking the button below:</p>
//           <div style="text-align: center; margin: 30px 0;">
//             <a href="${verificationUrl}" style="background-color: #4a86e8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a>
//           </div>
//           <p>This link will expire in 24 hours.</p>
//           <p>If you did not create this account, please ignore this email.</p>
//           <p>Best regards,<br>Your Application Team</p>
//         </div>
//       `
//     };
    
//     // Send email
//     await transporter.sendMail(mailOptions);
    
//     res.status(200).json({ 
//       success: true, 
//       message: 'Verification email sent successfully' 
//     });
    
//   } catch (error) {
//     console.error('Error sending verification email:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error sending verification email', 
//       error: error.message 
//     });
//   }
// };

// // Verify email controller
// export const verifyEmail = async (req, res) => {
//   const { token } = req.query;
  
//   try {
//     // Find user with the token
//     const users = await sql`
//       SELECT * FROM users 
//       WHERE verification_token = ${token} 
//       AND token_expiry > NOW()
//     `;
    
//     if (users.length === 0) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid or expired verification token' 
//       });
//     }
    
//     const user = users[0];
    
//     // Update user as verified
//     await sql`
//       UPDATE users 
//       SET is_verified = true, 
//           verification_token = NULL, 
//           token_expiry = NULL 
//       WHERE id = ${user.id}
//     `;
    
//     res.status(200).json({ 
//       success: true, 
//       message: 'Email verified successfully' 
//     });
    
//   } catch (error) {
//     console.error('Error verifying email:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Error verifying email', 
//       error: error.message 
//     });
//   }
// };