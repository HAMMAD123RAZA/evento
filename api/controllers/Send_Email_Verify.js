import nodemailer from "nodemailer";
// Use Node's built-in crypto module for randomBytes
import crypto from "crypto";
// Import your neon client
import { neon } from "@neondatabase/serverless";
const sql = neon(
    "postgresql://neondb_owner:npg_bZvVMjNr87DE@ep-purple-hall-a8y9hegq-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
);

export const sendEmailVerify = async (req, res) => {
  try {
    console.log("Email verification request received:", req.body);
    const { email, userId } = req.body;

    if (!email || !userId) {
      return res
        .status(400)
        .json({ message: "userId and Email required", success: false });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expireTime = new Date();
    expireTime.setHours(expireTime.getHours() + 24);

    console.log("Updating user with verification token:", { userId, token });

    // Add WHERE clause to update only the specific user
    const data = await sql`
      UPDATE "user" 
      SET "VerificationToken" = ${token}, 
          "tokenExpires" = ${expireTime}, 
          "isVerified" = ${false}
      WHERE "id" = ${userId}
      RETURNING *
    `;

    console.log("Database update result:", data);

    // Check if the user was found and updated
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Use the correct frontend URL and route pattern
    const verificationUrl = `http://localhost:5173/verify-email?userId=${userId}&token=${token}`;
    console.log("Generated verification URL:", verificationUrl);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "01hammadraza@gmail.com",
        pass: "wsqs mwzw sacu liih", // Note: Consider using environment variables for credentials
      },
    });

    const mailOptions = {
      from: "01hammadraza@gmail.com",
      to: email,
      subject: "Email Verification Link",
      html: `
        <h2>Verify Your Email</h2>
        <p>Thank you for registering! Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}">Click to Verify</a>
        <p>This link will expire in 24 hours.</p>
        <p>If you did not register for this account, please ignore this email.</p>
      `,
    };

    console.log("Sending email to:", email);
    const sendMail = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", sendMail);

    res.status(200).json({
      message: "Verification email sent successfully",
      success: true,
      sendMail,
    });
  } catch (error) {
    console.error("Error in sending email - full error:", error);
    res
      .status(500)
      .json({
        message: "error in sending email",
        success: false,
        error: error.message,
      });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    console.log("Verifying email with query parameters:", req.query);
    const { userId, token } = req.query;

    if (!userId || !token) {
      return res
        .status(401)
        .json({ message: "Invalid verification link", success: false });
    }

    const data = await sql`
      SELECT * FROM "user" 
      WHERE "id" = ${userId} 
      AND "VerificationToken" = ${token} 
      AND "tokenExpires" > ${new Date()}
    `;

    console.log("Verification lookup result:", data.length > 0 ? "User found" : "User not found");

    if (data.length === 0) {
      return res.status(404).json({ 
        message: 'Invalid or expired verification link', 
        success: false 
      });
    }

    // Update the user's verification status
    const updateResult = await sql`
      UPDATE "user" 
      SET "isVerified" = ${true} 
      WHERE "id" = ${userId}
    `;

    console.log("User verification status updated");

    res.status(200).json({ 
      message: 'Email verified successfully', 
      success: true 
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ 
      message: 'Error verifying email', 
      success: false, 
      error: error.message 
    });
  }
};
