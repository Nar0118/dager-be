const nodemailer = require("nodemailer");

module.exports = async function (mailOptions) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "passpad61@gmail.com",
        pass: "aojdmccqtzikhcdg",
      },
    });

    transporter.sendMail(
      {
        ...mailOptions,
      },
      (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
  } catch (err) {
    throw new Error("Failed to send email");
  }
};
