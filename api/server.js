import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';

const app = express();
app.use(cors());
app.use(express.json()); 

const sql = neon('postgresql://neondb_owner:npg_bZvVMjNr87DE@ep-purple-hall-a8y9hegq-pooler.eastus2.azure.neon.tech/neondb?sslmode=require');

app.listen(8080, () => {
    console.log("Server started on port 8080");
});

app.post('/add', async (req, res) => {
    const { title, description, venue, time, date } = req.body;

    if (!title || !description || !venue || !time || !date) {
        return res.status(400).send('All fields (title, description, venue, time, date) are required');
    }

    try {
        const result = await sql`
            INSERT INTO events (title, description, venue, time, date)
            VALUES (${title}, ${description}, ${venue}, ${time}, ${date})
            RETURNING *
        `;
        res.status(201).json(result);
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Internal Server Error');
    }
});