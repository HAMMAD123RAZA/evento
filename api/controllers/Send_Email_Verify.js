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
    const { email, userId } = req.body;

    if (!email || !userId) {
      return res
        .status(400)
        .json({ message: "userId and Email required", success: false });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expireTime = new Date();
    expireTime.setHours(expireTime.getHours() + 24);


    // Add WHERE clause to update only the specific user
    const data = await sql`
      UPDATE "user" 
      SET "VerificationToken" = ${token}, 
          "tokenExpires" = ${expireTime}, 
          "isVerified" = ${false}
      WHERE "id" = ${userId}
      RETURNING *
    `;

    // Check if the user was found and updated
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const verificationUrl = `http://localhost:8080/verify-email?userId=${userId}&token=${token}&expireTime=${expireTime.toISOString()}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "01hammadraza@gmail.com",
        pass: "wsqs mwzw sacu liih",
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

    const sendMail = await transporter.sendMail(mailOptions);
    res.status(200).json({
      message: "Verification email sent successfully",
      success: true,
      sendMail,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "error in sending email",
        success: false,
        error: error.message,
      });
    console.log("error in sending email", error);
  }
};

export const verifyEmail = async (req, res) => {
  const { userId, token, expireTime } = req.query;

  try {

    const data = await sql`
      SELECT * FROM "user" WHERE "id" = ${userId} AND "VerificationToken" = ${token} AND "tokenExpires" > ${new Date()}
    `;

    if (data.length === 0) {
      return res.status(404).json({ message: 'User not found or token expired', success: false });
    }

    // Update the user's verification status
    await sql`
      UPDATE "user" SET "isVerified" = ${true} WHERE "id" = ${userId}
    `;

    res.status(200).json({ message: 'Email verified successfully', success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying email', success: false, error: error.message });
  }
};

// export const verifyEmail = async (req, res) => {
//   try {
//     const { userId, token ,expireTime} = req.query;

//     if (!userId || !token) {
//       return res
//         .status(401)
//         .json({ message: "invalid verification link", success: false });
//     }

//     const data=await sql `
//     SELECT * FROM user WHERE id=${userId} AND verificationToken=${token} AND tokenExpires > ${new Date()}
//     `
// if(data.length==0){
//     return res.status(401).json({message:'invalid or expire link',success:false})
// }

// await sql`
// UPDATE user SET isVerified=${true} WHERE id=${userId}
// `

// res.status(200).json({ message: 'Email verified successfully', success: true });
// } catch (error) {
//   res.status(500).json({ message: 'Error verifying email', success: false, error: error.message });
// }
// };
