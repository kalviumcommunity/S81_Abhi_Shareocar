import twilio from 'twilio';

const buildClient = () => {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) return null;
  return twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
};

export const sendSmsOTP = async (to, code) => {
  const client = buildClient();
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!client || !from) {
    console.log('[SMS:DEV]', to, code);
    return true;
  }
  await client.messages.create({ to, from, body: `Your ShareOCar OTP is ${code}` });
  return true;
};
