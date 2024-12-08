import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

export const generator = () => {
    return Math.random().toString(36).slice(2, 9).toUpperCase();
  };
