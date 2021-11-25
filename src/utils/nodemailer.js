import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const createTransporter = async () => {
  // Agregar las credenciales de nuestra aplicación para autenticarnos vía OAUTH 2.0
  const oauthClient = new google.auth.OAuth2(
    'client_id',
    'client_secret',
    'https://developers.google.com/oauthplayground',
  );

  oauthClient.setCredentials({
    refresh_token: '',
  });

  let accessToken = '';
  try {
    accessToken = await oauthClient.getAccessToken();
  } catch (error) {
    console.log(error);
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'cuenta@gmail.com',
      accessToken,
      clientId: 'client_id',
      clientSecret: 'client_secret',
      refreshToken: 'refresh_token',
    },
  });

  return transporter;
};

const sendEmail = async () => {
  const emailTransporter = await createTransporter();
  await emailTransporter.sendMail({
    subject: 'Prueba Academlo',
    text: 'Esto es una prueba de un correo electronico con Nodemailer',
    to: 'oscar.islas@academlo.com',
    from: 'oislasreyes@gmail.com',
  });
};

sendEmail();
