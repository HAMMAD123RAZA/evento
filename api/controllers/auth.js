import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const sql = neon('postgresql://neondb_owner:npg_bZvVMjNr87DE@ep-purple-hall-a8y9hegq-pooler.eastus2.azure.neon.tech/neondb?sslmode=require');

export const Register=async(req,res)=>{
    const {name,email,password}=req.body;
   try {
    const user=await sql`SELECT * FROM users WHERE email=${email}`
    if (user.length>0){
        return res.status(400).json({message:"User already exists"})
    }
    const hashPass=await bcrypt.hash(password,10)
    const newUser=await sql`INSERT INTO users (name,email,password) VALUES(${name},${email},${hashPass}) RETURNING *`
    const token=jwt.sign({id:newUser.id},'meriSecKey',{expiresIn:'1h'})
    res.status(201).json({message:"user created Successfully",newUser,token})
   } catch (error) {
    res.status(500).json({message:'error creating user',error})
   }
}

export const Login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const users = await sql`SELECT * FROM users WHERE email = ${email}`;
        if (users.length === 0) { 
            return res.status(400).json({ message: 'User does not exist' });
        }

        const user = users[0];

        const CheckPass=await bcrypt.compare(password,user.password)
        if(!CheckPass){
            return res.status(500).json({message:"invalid password or email"})
        }
        const token=jwt.sign({id:user.id,email},'meriSecKey',{expiresIn:'1h'})
        res.status(200).json({message:"user logged in ",token})

    } catch (error) {
        res.status(500).json({message:'error logging user',error})

    }
}