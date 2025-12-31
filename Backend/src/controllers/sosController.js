import SOSAlert from '../models/SOSAlert.js';
// SMS sending removed for simplified app

export const triggerSOS = async (req, res) => {
  const { type, lat, lng, contactPhone } = req.body;
  if (!['police', 'ambulance', 'contact'].includes(type))
    return res.status(400).json({ message: 'Invalid SOS type' });
  const alert = await SOSAlert.create({
    user: req.user._id,
    type,
    location: { lat, lng },
    sentTo: type === 'contact' ? contactPhone : type,
  });
  // For demo: send SMS to contact if provided
  // Optionally integrate SMS later; currently just logs
  if (type === 'contact' && contactPhone) {
    console.log('[SOS CONTACT]', contactPhone, `SOS from ${req.user.name}. Location: ${lat},${lng}`);
  }
  res.status(201).json({ message: 'SOS triggered', alert });
};
