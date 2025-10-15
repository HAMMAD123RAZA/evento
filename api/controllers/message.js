import  jwt  from "jsonwebtoken";
import { neon } from '@neondatabase/serverless';

import dotenv from 'dotenv'

dotenv.config();
const sql = neon(process.env.sql);


export const verifyToken=(req,res,next)=>{
try {
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        res.status(401).json({message:"no token provided"})
    }
//verifying token
    const decoded=jwt.verify(token,'meriSecKey')
    req.user=decoded;
    next()

} catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export const sendMessage = async (req, res) => {
    const { message } = req.body;
    const email = req.user.email;
    const createdAt = new Date().toISOString();
    try {
      console.log('Request Body:', req.body);
      console.log('Decoded Token:', req.user);
      const result = await sql`INSERT INTO message(msg, person, time) VALUES(${message}, ${email}, ${createdAt}) RETURNING *`;
      res.status(201).json({ message: "message created", result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error in message creation", error: error.message });
    }
  };

export const getMessages=async(req, res)=>{
    try {
        const data=await sql`SELECT * FROM message `
        res.status(200).json({message:'data fetched',data})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"error in message fetching"})
    }
}

