import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import { createData } from './controllers/create.js';
import { getData, getSignleData } from './controllers/getdata.js';
import { updateData } from './controllers/updateData.js';

import { deleteSingleData, deleteAllData } from './controllers/deleteData.js';
const app = express();
app.use(cors());
app.use(express.json()); 

const sql = neon('postgresql://neondb_owner:npg_bZvVMjNr87DE@ep-purple-hall-a8y9hegq-pooler.eastus2.azure.neon.tech/neondb?sslmode=require');

app.listen(8080, () => {
    console.log("Server started");
});

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.post('/admin/event/add',createData)

app.get('/get',getData)

app.get('/get/:id',getSignleData)

app.put('/admin/update/:id',updateData)

app.delete('/admin/delete/:id',deleteSingleData)

app.delete('/admin/delete/',deleteAllData)