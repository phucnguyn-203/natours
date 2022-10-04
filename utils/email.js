const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    //1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    //2) Define email option
    const mailOptions = {
        from: 'phucnh203@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    //3) Send email to user
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
