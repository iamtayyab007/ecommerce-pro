import nodemailer from "nodemailer";

export const sendNodemailerEmail = async ({ email }: { email: string }) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let mailOptions = {
    from: "ecommerce Team By TK ",
    to: email,
    subject: "Sending Email using ecommerce TK Team",
    text: "thanks for signup into ecommerce by TK!",
  };
  await transporter.sendMail(mailOptions);
};
