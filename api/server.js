import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import { createData } from './controllers/create.js';
import { getData, getSignleData } from './controllers/getdata.js';
import { updateData } from './controllers/updateData.js';
import nodemailer from 'nodemailer';
import { deleteSingleData, deleteAllData } from './controllers/deleteData.js';
import { Login, Register } from './controllers/auth.js';
import { sendEmail } from './controllers/send-email.js';
import { sendEmailVerify, verifyEmail } from './controllers/Send_Email_Verify.js';
import { getMessages, sendMessage, verifyToken } from './controllers/message.js';

const app = express();
app.use(cors());
app.use(express.json()); 

app.listen(8080, () => {
    console.log("Server started");
});

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.post('/admin/event/add', createData);
app.get('/get', getData);
app.get('/get/:id', getSignleData);
app.put('/admin/update/:id', updateData);
app.delete('/admin/delete/:id', deleteSingleData);
app.delete('/admin/delete/', deleteAllData);

// Auth routes
app.post('/user/register', Register);
app.post('/user/login', Login);

// Email verification routes
app.post('/send_email_verify', sendEmailVerify);
app.get('/api/verify-email', verifyEmail); 

app.post('/send_email_Request', sendEmail);
app.post('/send_msg',verifyToken,sendMessage)
app.get('/get_msg',getMessages)