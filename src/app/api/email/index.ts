import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.NEXT_APP_HOST,
  port: 465, // SSL
  // port: 587, // TLS
  secure: true, // SSL은 true TLS는 false
  requireTLS: false,
  auth: {
    user: process.env.NEXT_APP_ADMIN_EMAIL,
    pass: process.env.NEXT_APP_PWD,
  },
});

export const sendMail = async (mailOptions: Mail.Options) => {
  const result = await transporter.sendMail(mailOptions);
  return result;
};
