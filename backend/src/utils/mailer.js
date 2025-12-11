// utils/mailer.js
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // O tu proveedor de correo
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER, // Tu correo (ponlo en .env)
    pass: process.env.EMAIL_PASS, // Tu contraseña de aplicación (ponla en .env)
  },
});