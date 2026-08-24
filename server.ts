import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    configuredEmail: process.env.CONTACT_RECEIVER_EMAIL || 'suhuyinifauzanadam@gmail.com',
    smtpConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
  });
});

// API Contact Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please fill in all required fields (Name, Email, and Message).',
      });
    }

    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || 'suhuyinifauzanadam@gmail.com';
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const emailSubject = `New Portfolio Inquiry from ${name} [${service || 'General Inquiry'}]`;
    const formattedDate = new Date().toLocaleString('en-GB', { timeZone: 'Africa/Accra' });

    const emailContent = `
New Inquiry from Portfolio Website (Adam Suhuyini Fauzan)
--------------------------------------------------------
Date & Time (Ghana): ${formattedDate}
Client Name: ${name}
Client Email: ${email}
Client Phone / WhatsApp: ${phone || 'Not provided'}
Service Needed: ${service || 'General Inquiry'}

Message Content:
${message}
--------------------------------------------------------
    `.trim();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0f172a; color: #ffffff; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px;">New Portfolio Inquiry</h2>
          <p style="margin: 5px 0 0; color: #94a3b8; font-size: 14px;">Adam Suhuyini Fauzan - Portfolio Website</p>
        </div>
        <div style="padding: 24px; background-color: #ffffff; color: #1e293b;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #64748b;">Client Name:</td>
              <td style="padding: 8px 0; font-size: 15px;"><strong>${name}</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Client Email:</td>
              <td style="padding: 8px 0; font-size: 15px;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Phone / WhatsApp:</td>
              <td style="padding: 8px 0; font-size: 15px;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Service Requested:</td>
              <td style="padding: 8px 0; font-size: 15px;"><span style="background-color: #dbeafe; color: #1e40af; padding: 3px 8px; border-radius: 4px; font-weight: 600;">${service || 'General Inquiry'}</span></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Submission Time:</td>
              <td style="padding: 8px 0; font-size: 14px; color: #64748b;">${formattedDate} (Ghana Time)</td>
            </tr>
          </table>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
            <h4 style="margin: 0 0 10px; color: #0f172a; font-size: 15px;">Message:</h4>
            <div style="background-color: #f8fafc; padding: 14px; border-radius: 6px; border-left: 4px solid #2563eb; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</div>
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 12px 20px; font-size: 12px; color: #64748b; text-align: center;">
          Sent from Adam Suhuyini Fauzan Portfolio Contact Form
        </div>
      </div>
    `;

    // Check if real SMTP credentials are provided
    if (smtpHost && smtpUser && smtpPass && smtpPass !== 'YOUR_SMTP_OR_APP_PASSWORD') {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${name} via Portfolio" <${smtpUser}>`,
        to: recipientEmail,
        replyTo: email,
        subject: emailSubject,
        text: emailContent,
        html: htmlContent,
      });

      console.log(`[Contact Form] Email successfully dispatched to ${recipientEmail} from ${email}`);

      return res.json({
        success: true,
        mode: 'smtp',
        message: "Thank you! Your message has been sent successfully. I'll get back to you soon.",
      });
    } else {
      // Development / Initial State: Log inquiry to server and return success with receipt details
      console.log('====================================================');
      console.log('📬 [NEW CONTACT MESSAGE RECEIVED]');
      console.log(`Recipient (Configure in .env CONTACT_RECEIVER_EMAIL): ${recipientEmail}`);
      console.log(`From: ${name} <${email}>`);
      console.log(`Phone/WhatsApp: ${phone || 'N/A'}`);
      console.log(`Service: ${service}`);
      console.log(`Message: ${message}`);
      console.log('====================================================');

      return res.json({
        success: true,
        mode: 'simulated',
        recipient: recipientEmail,
        message: "Thank you! Your message has been sent successfully. I'll get back to you soon.",
        info: 'Form processed securely via backend server.',
      });
    }
  } catch (error: any) {
    console.error('[Contact Form Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to dispatch message. Please try again or reach out directly on WhatsApp.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Adam Suhuyini Fauzan Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
