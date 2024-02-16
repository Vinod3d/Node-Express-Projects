const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {

    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'magali.rippin@ethereal.email',
            pass: '7RYUr5ZRb9fsASxPN4'
        }
    });


    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <factgyany@gmail.com>',
        to: "vinodchandra979@gmail.com",
        subject: "Hello",
        text: "Hello world?",
        html: "<b>Sending Emails With Node.js</b>",
      });


    res.json(info);
};

module.exports = sendEmail;