import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv'

dotenv.config();
const sql = neon(process.env.sql);

export const Register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        if (user.length > 0) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        
        // Hash password
        const hashPass = await bcrypt.hash(password, 10);
        
        // Insert new user with verification fields
        const newUser = await sql`
            INSERT INTO users (
                name, 
                email, 
                password, 
                is_verified, 
                verification_token, 
                token_expiry
            ) 
            VALUES (
                ${name}, 
                ${email}, 
                ${hashPass}, 
                false, 
                NULL, 
                NULL
            ) 
            RETURNING *
        `;
        
        // Generate JWT token
        const token = jwt.sign({ id: newUser[0].id }, 'meriSecKey', { expiresIn: '1h' });
        // localStorage.setItem("user be",newUser[0].id)
        res.status(201).json({
            success: true,
            message: "User created successfully. Please verify your email.",
            newUser: newUser[0],
            token
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error creating user', 
            error: error.message 
        });
    }
};

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user
        const users = await sql`SELECT * FROM users WHERE email = ${email}`;
        if (users.length === 0) {
            return res.status(400).json({ success: false, message: 'User does not exist' });
        }

        const user = users[0];
        
        // Check if email is verified
        if (!user.is_verified) {
            return res.status(403).json({ 
                success: false, 
                message: 'Email not verified. Please check your email and verify your account.'
            });
        }

        // Compare password
        const checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) {
            return res.status(401).json({ success: false, message: "Invalid password or email" });
        }
        
        // Generate JWT token
        const token = jwt.sign({ id: user.id, email }, 'meriSecKey', { expiresIn: '48h' });
        
        res.status(200).json({ 
            success: true, 
            message: "User logged in successfully", 
            token ,
            user
        });

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error logging in user', 
            error: error.message 
        });
    }
};

export const getUsers=async(req,res)=>{
    try {
        const data=await sql`SELECT * FROM users`
        res.status(200).json({
            success:true,
            message:"retrieved  users succesfully " ,
            data
        })
    } catch (error) {
        console.log(error)
    }
}