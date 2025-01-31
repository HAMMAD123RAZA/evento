import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_bZvVMjNr87DE@ep-purple-hall-a8y9hegq-pooler.eastus2.azure.neon.tech/neondb?sslmode=require');


 export const createData=async(req,res)=>{
    const {title,description , venue, date,time,imgurl}=req.body;
    try {
        const data=await sql`INSERT INTO events(title,description,venue,date,time,imgurl) VALUES(${title},${description},${venue},${date},${time},${imgurl})
        RETURNING *
        `;
        res.status(201).json(data)
    } catch (error) {
        console.error('error in server',error)
        res.status(500).send("Internal Server Err")
    }
}