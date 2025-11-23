import nodemailer from 'nodemailer';
import type { InsertContactMessage } from '@shared/schema';

// Use strict configuration for Render/Cloud hosting
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  // CRITICAL: Force IPv4. Render often fails to route IPv6 to Gmail.
  family: 4 
});

export async function sendContactEmail(message: InsertContactMessage): Promise<boolean> {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn('Email credentials not configured, skipping email send');
    return false;
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
    // Verify connection before sending
    await transporter.verify();
    await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send contact email:', error);
    // Return false instead of throwing error so the user still gets a success message
    return false; 
  }
}
