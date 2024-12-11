import express from 'express';
import { registerUser, loginUser, verifyOTP,logoutUser, isAuthenticated } from '../controllers/user.controllers.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOTP);
router.post('/logout', logoutUser);
router.get('/isAuthenticated', isAuthenticated);

export default router;
