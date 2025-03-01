import nodemailer from 'nodemailer';
import Crypto from 'crypto-js';

export const sendEmailVerify=async(req,res)=>{
try {
    const {email,userId}=req.body

    if (!email || !userId) {
        res.status(400).json({message:'userId and Email required',success:false})
    }

    const token=crypto.randomBytes(32).toString('hex')
    const expireTime=new Date();
    expireTime.setHours(expireTime.getHours()+24)

    const sql = neon('postgresql://neondb_owner:npg_bZvVMjNr87DE@ep-purple-hall-a8y9hegq-pooler.eastus2.azure.neon.tech/neondb?sslmode=require');
    
    const data=await sql`UPDATE user SET VerificationToken=${token},tokenExpires=${expireTime},isVerified=${false}`

        const verificationUrl = `http://localhost:8080/verify-email?userId=${userId}&token=${token} &expireTime=${expireTime}`;

        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'01hammadraza@gmail.com',
                pass: 'wsqs mwzw sacu liih'
            }
        })

        const mailOptions={
            from:'01hammadraza@gmail.com',
            to:email,
            subject:'Email Verification Link',
            html:`
                <h2>Verify Your Email</h2>
                <p>Thank you for registering! Please verify your email by clicking the link below:</p>
                <a href="${verificationUrl}"  >Click to Verify</a>
                <p>This link will expire in 24 hours.</p>
                <p>If you did not register for this account, please ignore this email.</p>
            `
        }

        const sendMail=await transporter.sendMail(mailOptions)
        res.status(200).json({
            message: 'Verification email sent successfully',
            success:true,
            sendMail
        })


} catch (error) {
    res.status(500).json({message:"error in sending email",success:false,error:error.message})
    console.log('error in sending email',error)
}
}