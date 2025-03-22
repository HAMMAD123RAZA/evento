import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import { createData } from './controllers/create.js';
import { getData, getSignleData } from './controllers/getdata.js';
import { updateData } from './controllers/updateData.js';
import nodemailer from 'nodemailer';
import { deleteSingleData, deleteAllData } from './controllers/deleteData.js';
import { getUsers, Login, Register } from './controllers/auth.js';
import { sendEmail } from './controllers/send-email.js';
import { sendEmailVerification, verifyEmail } from './controllers/Send_Email_Verify.js';
import { getMessages, sendMessage, verifyToken } from './controllers/message.js';
import { createBlog, deleteBlog, getBlog, getBlogById, updateBlog } from './controllers/blog.js';

// pass=wsqs mwzw sacu liih

// sql='postgresql://neondb_owner:npg_bZvVMjNr87DE@ep-purple-hall-a8y9hegq-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'

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
app.get('/admin/getUsers',getUsers)

// Email verification routes
// app.post('/send_email_verify', sendEmailVerify);
// app.get('/verify-email', verifyEmail); 

app.post('/send_email_verify', sendEmailVerification);

// Route to verify email
app.get('/verify-email', verifyEmail);


app.post('/send_email_Request', sendEmail);
app.post('/send_msg',verifyToken,sendMessage)
app.get('/get_msg',getMessages)

app.post('/admin/blog',createBlog)
app.get('/getAll/blogs', getBlog)
app.get('/get/blog/:id', getBlogById)
app.put('/update/blog/:id',updateBlog)
app.delete('/delete/blog/:id',deleteBlog)
