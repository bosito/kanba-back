import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const { OAuth2 } = google.auth;

const createTransporter = async () => {
  // Configurar las credenciales para el cliente OAuth2
  const oauthClient = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground',
  );

  oauthClient.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  let accessToken = '';

  // eslint-disable-next-line no-useless-catch
  try {
    accessToken = await oauthClient.getAccessToken();
  } catch (error) {
    throw error;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.G_USER,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  return transporter;
};

const sendEmail = async (emailOptions) => {
  const { subject, text, to } = emailOptions;
  const transporter = await createTransporter();
  const results = await transporter.sendMail({
    subject,
    text,
    to,
    from: `Academlo <${process.env.G_USER}>`,
  });
  return results;
};

export default sendEmail;
