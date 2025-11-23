import nodemailer from 'nodemailer';
import type { InsertContactMessage } from '@shared/schema';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendContactEmail(message: InsertContactMessage): Promise<boolean> {
  // 1. Check if credentials exist
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn('Missing email credentials (GMAIL_USER or GMAIL_APP_PASSWORD). Email skipped.');
    return false; // Return false but don't crash
  }

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `Portfolio Contact: Message from ${message.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${message.name}</p>
      <p><strong>Email:</strong> ${message.email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Reply directly to: ${message.email}</small></p>
    `,
    replyTo: message.email,
  };

  try {
    // 2. Add a verification check to fail fast if connection is bad
    await transporter.verify(); 
    await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send contact email:', error);
    // Don't throw error to the user, just log it so the form submission still "succeeds" in saving to DB
    return false; 
  }
}
