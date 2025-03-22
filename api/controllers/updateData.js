import { neon } from '@neondatabase/serverless';

import dotenv from 'dotenv'

dotenv.config();
const sql = neon(process.env.sql);

export const updateData = async (req, res) => {
    const { id } = req.params;
    const { title, description, venue, date, time, imgurl } = req.body;
    
    try {
        const data = await sql`
            UPDATE events 
            SET 
                title = ${title},
                description = ${description},
                venue = ${venue},
                date = ${date},
                time = ${time},
                imgurl = ${imgurl}
            WHERE id = ${id}
            RETURNING *
        `;
        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
};