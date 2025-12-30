import nodemailer from 'nodemailer';

const buildTransport = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
};

export const sendEmailOTP = async (to, code) => {
  const transport = buildTransport();
  const from = process.env.EMAIL_FROM || 'no-reply@shareocar.com';
  const msg = { from, to, subject: 'Your ShareOCar OTP', text: `Your OTP is ${code}` };
  if (!transport) {
    console.log('[EMAIL:DEV]', to, code);
    return true;
  }
  await transport.sendMail(msg);
  return true;
};
