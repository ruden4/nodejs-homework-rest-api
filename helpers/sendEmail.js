const nodemailer = require("nodemailer");

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

const transport = nodemailer.createTransport(config);

const sendEmail = async (data) => {
  console.log(process.env.EMAIL, process.env.PASSWORD);

    const email = { ...data, from: process.env.EMAIL };
    await transport
        .sendMail(email);

    return true;
}

module.exports = sendEmail;



