import { neon } from '@neondatabase/serverless';

import dotenv from 'dotenv'

dotenv.config();
const sql = neon(process.env.sql);

export const getData=async(req,res)=>{

    try {
        const data=await sql`SELECT * FROM events`
        res.status(201).json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json('internal server err')

    }
}

export const getSignleData=async(req,res)=>{
    const {id}=req.params;

    try {
        const data=await sql`SELECT * FROM events WHERE id=${id}`
        res.status(201).json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json('internal server err')

    }
}