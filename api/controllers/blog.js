import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();
const sql = neon(process.env.sql);

export const createBlog=async(req,res)=>{
    const {title, shortdesc, longdesc, date, imgurl}=req.body;
    try {
        const api=await sql `INSERT INTO blogs (title,shortdesc,longdesc,date,imgurl) VALUES(${title},${shortdesc},${longdesc},${date},${imgurl})
        RETURNING *`
        res.status(200).json({message:'data submitted successfully',blog:api[0]} )
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'internal server error'})
    }
}

export const getBlog=async(req, res)=>{
    try {
        const blog=await sql `SELECT * FROM blogs`
        res.status(200).json({message:'data submitted successfully', blog})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'internal server error'})
    }
}

export const getBlogById=async(req, res)=>{
    const {id}=req.params;
    try {
        const blog=await sql `SELECT * FROM blogs WHERE id=${id}`
        res.status(200).json({message:'data fetced successfully', blog})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'internal server error'})
    }
}

export const deleteBlog=async(req,res)=>{
    const {id}=req.params;
    try {
        const data=await sql `DELETE FROM blogs WHERE id=${id}`
        res.status(200).json({message:'data deleted successfully', data})
    } catch (error) {
        res.status(500).json({message:'internal server error'})
        console.log(error)
    }
}

export const updateBlog=async(req,res)=>{
    const {id,title, shortdesc, longdesc, date, imgurl}=req.body;
    try {
        const data=await sql`UPDATE blogs SET title=${title} , shortdesc=${shortdesc} ,longdesc=${longdesc} ,date=${date} , imgurl=${imgurl} WHERE id=${id} RETURNING *`
        res.status(201).json({message:"data updated succesfully",data})
    } catch (error) {
        res.status(500).json({message:'internal server error'})
        console.log(error)
    }
}
