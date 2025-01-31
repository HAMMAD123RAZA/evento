import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_bZvVMjNr87DE@ep-purple-hall-a8y9hegq-pooler.eastus2.azure.neon.tech/neondb?sslmode=require');

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