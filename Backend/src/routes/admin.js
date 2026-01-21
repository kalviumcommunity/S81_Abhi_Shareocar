import { Router } from 'express';
import {
  listUsers,
  getUser,
  verifyDriver,
  updateUserRole,
  getStats,
  deleteUser,
} from '../controllers/adminController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const r = Router();

// All admin routes require authentication and admin role
r.use(requireAuth, requireAdmin);

// Dashboard stats
r.get('/stats', getStats);

// User management
r.get('/users', listUsers);
r.get('/users/:id', getUser);
r.put('/users/:id/verify', verifyDriver);
r.put('/users/:id/role', updateUserRole);
r.delete('/users/:id', deleteUser);

export default r;
