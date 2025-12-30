export const generateOTP = () => String(Math.floor(100000 + Math.random() * 900000));
export const expiryDate = (minutes = 10) => new Date(Date.now() + minutes * 60 * 1000);
