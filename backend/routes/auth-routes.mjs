import express from 'express';
import { getMe, logIn, register } from '../controllers/auth-controller.mjs';
import { protect } from '../middleware/authorization.mjs';

const router = express.Router();

router.post('/register', register);
router.post('/login', logIn);
router.get('/me', protect, getMe);

export default router;
