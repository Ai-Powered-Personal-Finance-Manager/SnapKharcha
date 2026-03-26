// config/mailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,      // your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // App Password (not your real password)
    },
});

export default transporter;