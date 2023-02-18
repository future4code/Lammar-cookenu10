import nodemailer from "nodemailer"

export class Nodemailer {
    transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth:{
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
        tls:{
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },
    })
}