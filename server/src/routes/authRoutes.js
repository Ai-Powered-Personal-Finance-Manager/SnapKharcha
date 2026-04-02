import express from 'express'
import passport from '../config/passport.js';
import { login, register, forgotPassword, verifyOtp, resetForgotPassword, resetPassword, googleAuthCallback, refreshToken, logout } from '../controllers/authController.js';

const authRouter = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rohan Shrestha
 *               email:
 *                 type: string
 *                 example: rohan@example.com
 *               password:
 *                 type: string
 *                 example: mypassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
authRouter.post('/register', register)
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: rohan@example.com
 *               password:
 *                 type: string
 *                 example: mypassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 user:
 *                   type: object
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
authRouter.post('/login', login)
// Forgot password flow (no auth needed)
/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Send OTP to email for password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: rohan@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       500:
 *         description: Server error
 */
authRouter.post('/forgot-password', forgotPassword);
/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP for password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 example: rohan@example.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified, returns resetToken
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resetToken:
 *                   type: string
 *       400:
 *         description: Invalid or expired OTP
 *       500:
 *         description: Server error
 */
authRouter.post('/verify-otp', verifyOtp);
/**
 * @swagger
 * /api/auth/reset-forgot-password:
 *   post:
 *     summary: Set new password after OTP verification
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       401:
 *         description: No token or token expired
 *       500:
 *         description: Server error
 */
authRouter.post('/reset-forgot-password', resetForgotPassword);

// Reset password (must be logged in)
/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password while logged in
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: oldpassword123
 *               newPassword:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Current password incorrect or same as new
 *       401:
 *         description: No token or token expired
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Get new access token using refresh token cookie
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Returns new access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: No refresh token
 *       403:
 *         description: Invalid refresh token
 */
authRouter.post('/refresh', refreshToken);
/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user and clear refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       500:
 *         description: Server error
 */
authRouter.post('/logout', logout);

export default authRouter;