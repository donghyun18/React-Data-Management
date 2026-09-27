const nodemailer = require('nodemailer');

/**
 * Sends a 6-digit verification code to the given email address.
 *
 * Two ways to send mail are supported — pick whichever env vars you fill in:
 *   1) Resend (recommended, no 2FA/app-password hassle): set RESEND_API_KEY.
 *      Free tier works out of the box with the onboarding@resend.dev sender,
 *      no domain verification needed for testing.
 *   2) Gmail via nodemailer: set EMAIL_USER + EMAIL_PASS (Gmail App Password).
 *
 * If neither is configured, this throws so the route can report a clear error.
 */
async function sendVerificationEmail(toEmail, code) {
  const subject = 'Pet Heaven - Your verification code';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
      <h2 style="color:#2B4570;">Verify your email</h2>
      <p>Thanks for signing up for Pet Heaven! Use the code below to verify your email address:</p>
      <p style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #E49273;">${code}</p>
      <p>This code expires in 10 minutes. If you didn't request this, you can ignore this email.</p>
    </div>
  `;

  if (process.env.RESEND_API_KEY) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Pet Heaven <onboarding@resend.dev>',
        to: [toEmail],
        subject,
        html
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Resend API error (${response.status}): ${errorBody}`);
    }
    return;
  }

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: toEmail,
      subject,
      html
    });
    return;
  }

  throw new Error(
    'No email provider configured. Set RESEND_API_KEY, or EMAIL_USER + EMAIL_PASS, in server/.env.'
  );
}

module.exports = { sendVerificationEmail };
