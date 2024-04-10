import { getTranslations } from "next-intl/server";
import nodemailer from "nodemailer";
const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

export const sendMail = async ({ from, to, name, subject, body }: any) => {
  const t = await getTranslations("email")
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
      from: `"Next.js Template" ${SMTP_EMAIL}`, // sender address
      to, // list of receivers
      subject, // Subject line
      html: body, // HTML body content
    });

    console.log("Message sent: %s", info.messageId);
    return { success: t("emailS") };
  } catch (error) {
    console.error("Error sending email", error);
    return { error: t("sendingME") };
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const t = await getTranslations("email")
  try {
    await sendMail({
      to: email,
      from: SMTP_EMAIL,
      subject: t("resetP"),
      body: `<p>${t("resetT")} ${token}</p>`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const t = await getTranslations("email")
  try {
    await sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: t("confirmE"),
      body: `<p>${t("emailVT")} <strong>${token}</strong></p>`,
    });
  } catch (error) {
    console.log(error);
  }
};
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const t = await getTranslations("email")
  try {
    await sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: t("2fa"),
      body: `<p>${t("2faCode")} : ${token}</p>`,
    });
  } catch (error) {
    console.log(error);
  }
};
