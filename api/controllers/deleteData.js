import { neon } from '@neondatabase/serverless';

import dotenv from 'dotenv'

dotenv.config();
const sql = neon(process.env.sql);



export  const deleteSingleData=async (req,res)=>{
    const {id}=req.params;
    const {title,description , venue, date,time,imgurl}=req.body;

    try {
        const deleted=await sql`DELETE FROM events WHERE id=${id} RETURNING *`
        res.status(201).json('deleted item')
    } catch (error) {
        console.error(error)
        res.status(500).json('internal server err')

    }
}

export const deleteAllData=async (req,res)=>{

    try {
        const data=await sql`DELETE * FROM events RETURNING *`
        res.status(201).json('deleted all')
    } catch (error) {
        console.error(error)
        res.status(500).json('internal server err')

    }
}