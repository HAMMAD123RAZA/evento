import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const sql = neon('postgresql://neondb_owner:npg_bZvVMjNr87DE@ep-purple-hall-a8y9hegq-pooler.eastus2.azure.neon.tech/neondb?sslmode=require');


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
        const api=await sql `SELECT * FROM blogs WHERE id=${id}`
        res.status(200).json({message:'data fetced successfully', api})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'internal server error'})
    }
}
