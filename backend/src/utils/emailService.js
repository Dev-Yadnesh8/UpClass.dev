import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(eamil, verificationToken) {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [eamil],
      subject: "Verify your email to complete registration",
      html: `
  <div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: auto; padding: 24px; background-color: #f9f9f9; border-radius: 8px;">
    <h2 style="color: #333;">Welcome to UpClass.dev 👋</h2>
    <p style="font-size: 16px; color: #555;">Thank you for signing up. To complete your registration, please verify your email by entering the following code:</p>
    
    <div style="margin: 20px 0; font-size: 28px; font-weight: bold; color: #000; letter-spacing: 2px; text-align: center;">
      ${verificationToken}
    </div>

    <p style="font-size: 14px; color: #999;">This code will expire in 30 minutes. If you didn’t request this, you can safely ignore this email.</p>

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
  </div>
`,
    });
  } catch (error) {
    console.error("Email service error:", error);
  }
}

async function sendPasswordResetEmail(eamil, clientUrl) {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [eamil],
      subject: "Verify your email to complete registration",
      html: `
<div style="font-family: 'Poppins', sans-serif; max-width: 600px; margin: auto; padding: 24px; background-color: #f9f9f9; border-radius: 8px;">
    <h2 style="color: #333;">Forgot your password?</h2>
    <p style="font-size: 16px; color: #555;">
      No worries! You can reset your password by clicking the button below.
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${clientUrl}" style="display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: #fff; text-decoration: none; font-weight: 600; border-radius: 6px;">
        Reset Password
      </a>
    </div>

    <p style="font-size: 14px; color: #999;">
      This link will expire in 30 minutes. If you did not request a password reset, you can safely ignore this email.
    </p>

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
    <p style="font-size: 12px; color: #bbb; text-align: center;">© 2025 UpClass.dev. All rights reserved.</p>
  </div>

`,
    });
  } catch (error) {
    console.error("Email service error:", error);
  }
}

export { sendEmail, sendPasswordResetEmail };
