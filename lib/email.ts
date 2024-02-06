import { Resend } from "resend";
const resend = new Resend(process.env.MAIL_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const emailConfirmLink = `http://localhost:3000/confirm-verification?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Email Confirmation",
    html: `<p>Click on 'ConfirmAuth' to confirm your email address: <a href="${emailConfirmLink}">ConfirmAuth</a></p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Password Reset",
    html: `<p>Click on 'ConfirmAuth' to reset the password of your email-id: <a href="${resetLink}">ConfirmAuth</a></p>`,
  });
};
