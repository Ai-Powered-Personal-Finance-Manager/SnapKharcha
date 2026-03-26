import prisma from '../config/prisma.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendWelcomeEmail } from '../utils/sendWelcomeEmail.js';
import { sendOtpEmail } from '../utils/sendOtpEmail.js';

// Register user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.json({success: false, message: 'Missing Details'})
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // Send welcome email (non-blocking)
        sendWelcomeEmail(user.email, user.name).catch(err =>
            console.error("Welcome email failed:", err)
        );

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'secret', // Replace 'secret' with strong secret in prod
        { expiresIn: '1h' }
        );

        // Return token and user info
        const { password: _, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// FORGOT PASSWORD — Step 1: Send OTP
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            // Don't reveal if email exists or not for security
            return res.status(200).json({ message: 'If that email exists, an OTP has been sent.' });
        }

        // Generate 6 digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Save OTP to database
        await prisma.user.update({
            where: { email },
            data: { otp, otpExpiresAt },
        });

        // Send OTP email
        await sendOtpEmail(email, otp);

        res.status(200).json({ message: 'An OTP has been sent to your email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// FORGOT PASSWORD — Step 2: Verify OTP
export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.otp || !user.otpExpiresAt) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Check OTP match
        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Check OTP expiry
        if (new Date() > user.otpExpiresAt) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // OTP is valid — return a short-lived token for the next step
        const resetToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '15m' } // only 15 minutes to reset password
        );

        res.status(200).json({ message: 'OTP verified', resetToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// FORGOT PASSWORD — Step 3: Set New Password
export const resetForgotPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // compare hashed password
        const isSame = await bcrypt.compare(newPassword, user.password);
        if (isSame) {
            return res.status(400).json({ message: 'New password cannot be the same as previous password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password and clear OTP
        await prisma.user.update({
            where: { id: decoded.id },
            data: {
                password: hashedPassword,
                otp: null,
                otpExpiresAt: null,
            },
        });

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Reset token expired, please request a new OTP' });
        }
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// RESET PASSWORD — User is logged in
export const resetPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Prevent reusing same password
        const isSame = await bcrypt.compare(newPassword, user.password);
        if (isSame) {
            return res.status(400).json({ message: 'New password cannot be the same as current password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: decoded.id },
            data: { password: hashedPassword },
        });

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Session expired, please login again' });
        }
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const googleAuthCallback = (req, res) => {
    try {
        // req.user is set by passport after successful OAuth
        const user = req.user;

        // Generate JWT same as normal login
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Redirect to frontend with token in URL
        // Frontend grabs it from URL and stores in localStorage
        res.redirect(`${process.env.CLIENT_URL}/oauth-callback?token=${token}`);
    } catch (error) {
        console.error(error);
        res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);
    }
};