import nodemailer from "nodemailer";
import { google } from "googleapis";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

interface mailProps {
  to: string;
  subject: string;
  html: any;
}
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN! });


async function sendMail({ to, subject, html }: mailProps) {
  try {
    const accessTokenResponse = await oAuth2Client.getAccessToken();
    const accessToken = accessTokenResponse.token;

    if (!accessToken) {
      throw new Error("Failed to obtain access token");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "fendverse@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });

    const info = await transporter.sendMail({
      from: `"Housely" <support@housely.com>`,
      to,
      subject,
      html,
    });

    console.log(`Email sent successfully to ${to}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`Error sending email to ${to}:`, err);
    // DO NOT use res here — just throw or return error
    throw err; // Let the caller handle it
  }
}

export default sendMail;
