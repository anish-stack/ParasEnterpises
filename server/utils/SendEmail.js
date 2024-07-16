const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: process.env.SMTP_PORT || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USERNAME, // your Gmail address
                pass: process.env.EMAIL_PASSWORD  // your Gmail password
            }
        });

        const mailOptions = {
            from: `"Paras Enterprises" <${process.env.EMAIL_USERNAME}>`, 
            to: options.email, // list of receivers
            subject: options.subject, // Subject line
            html: options.message // html body
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
};

module.exports = sendEmail;
