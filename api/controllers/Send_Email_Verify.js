import nodemailer from 'nodemailer';
export const sendEmailVerify=async(req,res)=>{
    const {emailData}=req.body;
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
    user: "01hammadraza@gmail.com",
    pass:'wsqs mwzw sacu liih'
        }
    })
    
    const mailOptions={
        from:'01hammadraza@gmail.com',
        to: '01hammadraza@gmail.com',
        subject:`Event subscribed :${emailData?.title}`,
        html:`
              <h2>${emailData?.title}</h2>
          <p><strong>Date:</strong> ${emailData?.date}</p>
          <p><strong>Time:</strong> ${emailData?.time}</p>
          <p><strong>Venue:</strong> ${emailData?.venue}</p>
          <p><strong>Description:</strong> ${emailData?.description}</p>
        `
    }
    try {
        const info=await transporter.sendMail(mailOptions)
        res.status(200).json({message:'email is sent successfully',info})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send email" });
    }
    }