require('dotenv').config();


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD
    }
});

setTimeout(()=>{
    transporter.sendMail({
        from: 'zeitung.zeitung.cool@gmail.com',
        to: 'e264997@edu.sbl.ch',
        subject: 'Bestätigungs Code',
        html: `<h3>Ihr code lautet: </h3><h1>hi</h1>`
    }, (error, info) => {
        console.log(error);
        console.log(info);
    });
}, 2000);
