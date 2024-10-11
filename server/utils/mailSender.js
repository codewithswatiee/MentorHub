const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async(email, title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host : process.env.HOST,
            auth:{
                user: process.env.USER,
                pass: process.env.PASS
            }
        })

        let info = await transporter.sendMail({
            from: 'MentorHub by Swati Verma',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })

        return info;
    } catch(err){
        console.log(err.message)
    }
}

module.exports = mailSender;