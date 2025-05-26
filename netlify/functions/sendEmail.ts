// netlify/functions/sendEmail.ts

import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const { name, email, message } = JSON.parse(event.body || '{}');

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: 'Missing required fields',
    };
  }

  // Transport using your Gmail (you must allow less secure apps or generate an App Password)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.CONTACT_EMAIL,      // your Gmail address
      pass: process.env.CONTACT_EMAIL_PASS, // App Password
    },
  });

  try {
    await transporter.sendMail({
      from: `"SFL Contact Form" <${process.env.CONTACT_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: `Email failed: ${err.message}`,
    };
  }
};

export { handler };
