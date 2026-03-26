import express from 'express'
import passport from '../config/passport.js';
import { login, register, forgotPassword, verifyOtp, resetForgotPassword, resetPassword, googleAuthCallback } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/register', register)
authRouter.post('/login', login)
// Forgot password flow (no auth needed)
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/verify-otp', verifyOtp);
authRouter.post('/reset-forgot-password', resetForgotPassword);

// Reset password (must be logged in)
authRouter.post('/reset-password', resetPassword);

// OAuth routes
// Step 1 — redirect user to Google
authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Step 2 — Google redirects back here after login
authRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    googleAuthCallback
);

export default authRouter;