import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const emailData = {
      from: 'Acme <onboarding@resend.dev>',
      to,
      subject,
      html: htmlContent,
    };

    await resend.emails.send(emailData);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
