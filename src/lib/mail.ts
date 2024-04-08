import nodemailer from "nodemailer";
import  handlebars from "handlebars";
import { testTemplate } from "@/template/test";
const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

export const sendMail = async ({ from, to, name, subject, body }:any) => {
  try {
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.titan.email", // Hostinger SMTP server
      port: 587, // SMTP port
      secure: false, // true for 465, false for other ports
      auth: {
        user: SMTP_EMAIL, // your email address
        pass: SMTP_PASSWORD, // your email password
      },
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Your Name" ${SMTP_EMAIL}`, // sender address
      to, // list of receivers
      subject, // Subject line
      html: body, // HTML body content
    });

    console.log("Message sent: %s", info.messageId);
    return { success: "mail send" };
  } catch (error) {
    console.error("Error sending email", error);
    return { error: "erro trying to send mail" };
  }
};
export function compileTestTemplate(name:string) {
  const template = handlebars.compile(testTemplate);
  const htmlBody = template({
    name: name,
  });
  return htmlBody;
}

export const sendPasswordResetEmail = async (email:string, token:string) => {
  try {
    await sendMail({
      to: email,
      from: SMTP_EMAIL,
      subject: "Reinitialisez votre mot de passe",
      body: `<p>your email reset token is ${token}</p>`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendVerificationEmail = async (email:string, token:string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;
  try {
    await sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "Confirmez votre address mail",
      body: `<p>This is the token to verified your email <strong>${token}</strong></p>`,
    });
  } catch (error) {
    console.log(error);
  }
};
export const sendTwoFactorTokenEmail = async (email:string, token:string) => {
  try {
    await sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "2FA code",
      body: `<p>votre code de 2fa est : ${token}</p>`,
    });
  } catch (error) {
    console.log(error);
  }
};
