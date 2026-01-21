import { z } from 'zod';

// Password must be at least 8 chars with uppercase, lowercase, and number
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\+?[0-9]+$/, 'Invalid phone number format'),
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const createRideSchema = z.object({
  source: z.string().min(2, 'Source is required'),
  destination: z.string().min(2, 'Destination is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),
  seatsAvailable: z.number().int().min(1, 'At least 1 seat required').max(10),
  pricePerSeat: z.number().min(0, 'Price cannot be negative'),
  parcelCapacityKg: z.number().min(0).optional(),
  pricePerKg: z.number().min(0).optional(),
  vehicle: z
    .object({
      model: z.string().optional(),
      plate: z.string().optional(),
      color: z.string().optional(),
    })
    .optional(),
  notes: z.string().max(500).optional(),
});

export const updateRideSchema = createRideSchema.partial().extend({
  status: z.enum(['open', 'closed', 'cancelled']).optional(),
});

export const bookRideSchema = z.object({
  seats: z.number().int().min(1, 'At least 1 seat required').max(10).optional().default(1),
});

export const sosSchema = z.object({
  type: z.enum(['police', 'ambulance', 'contact'], {
    errorMap: () => ({ message: 'SOS type must be police, ambulance, or contact' }),
  }),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  contactPhone: z.string().optional(),
});

export const verificationDocsSchema = z.object({
  idDocUrl: z.string().url('Invalid ID document URL'),
  licenseUrl: z.string().url('Invalid license URL'),
});

/**
 * Validates request body against a Zod schema.
 * Returns a middleware function.
 */
export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
      return res.status(400).json({
        message: 'Validation failed',
        errors: messages,
      });
    }
    next(error);
  }
};
