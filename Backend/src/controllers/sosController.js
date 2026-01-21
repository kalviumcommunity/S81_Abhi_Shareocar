import SOSAlert from '../models/SOSAlert.js';
import { asyncHandler, AppError } from '../utils/asyncHandler.js';

/**
 * POST /api/sos - Trigger an SOS alert
 */
export const triggerSOS = asyncHandler(async (req, res) => {
  const { type, lat, lng, contactPhone } = req.body;

  // Validate contact phone for contact type
  if (type === 'contact' && !contactPhone) {
    throw new AppError('Contact phone number is required for contact SOS type', 400);
  }

  const alert = await SOSAlert.create({
    user: req.user._id,
    type,
    location: lat && lng ? { lat, lng } : undefined,
    sentTo: type === 'contact' ? contactPhone : type,
  });

  // Log SOS for emergency response (in production, integrate with emergency services)
  console.log(`[SOS ALERT] User: ${req.user.name} (${req.user._id})`);
  console.log(`[SOS ALERT] Type: ${type}, Location: ${lat ?? 'N/A'}, ${lng ?? 'N/A'}`);

  if (type === 'contact' && contactPhone) {
    // TODO: Integrate with SMS service for production
    console.log(`[SOS CONTACT] Sending alert to: ${contactPhone}`);
    console.log(`[SOS MESSAGE] Emergency! ${req.user.name} needs help. Location: https://maps.google.com/?q=${lat},${lng}`);
  }

  res.status(201).json({
    message: 'SOS alert triggered successfully',
    alert,
    emergencyInfo: {
      police: '100',
      ambulance: '108',
      helpline: '112',
    },
  });
});

/**
 * GET /api/sos/my - Get user's SOS alerts history
 */
export const getMyAlerts = asyncHandler(async (req, res) => {
  const alerts = await SOSAlert.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);

  res.json({ alerts });
});
