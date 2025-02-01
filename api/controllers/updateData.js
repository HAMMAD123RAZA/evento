import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_bZvVMjNr87DE@ep-purple-hall-a8y9hegq-pooler.eastus2.azure.neon.tech/neondb?sslmode=require');

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