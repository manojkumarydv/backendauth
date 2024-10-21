import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,      //'smtp.gmail.com'
  port: process.env.EMAIL_PORT,      // 587
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Admin Gmail ID     //'manojkumar120101@gmail.com'
    pass: process.env.EMAIL_PASS, // Admin Gmail Password    //'pefhugnoqdkggobz'
  },
})

export default transporter