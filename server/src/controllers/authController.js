import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import AppError from "../utils/AppError.js";
import { sendOtpEmail } from "../utils/sendOtpEmail.js";
import { sendWelcomeEmail } from "../utils/sendWelcomeEmail.js";

// Helper to generate both tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" },
  );
  return { accessToken, refreshToken };
};

// ─────────────────────────────────────────
// REGISTER
// ─────────────────────────────────────────
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new AppError("Name, email and password are required", 400));
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return next(new AppError("User with this email already exists", 409));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // create default category
    await prisma.category.create({
      data: {
        name: "Overall",
        userId: user.id,
      },
    });

    sendWelcomeEmail(user.email, user.name).catch((err) =>
      console.error("Welcome email failed:", err),
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      email: user.email,
    });
  } catch (error) {
    next(error); // passes to errorHandler
  }
};

// ─────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError("Invalid email or password", 401));
    }

    const { accessToken, refreshToken } = generateTokens(user);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ success: true, message: "Logged in successfully", accessToken });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// FORGOT PASSWORD — Step 1: Send OTP
// ─────────────────────────────────────────
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new AppError("Email is required", 400));
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Don't reveal if email exists or not for security
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If that email exists, an OTP has been sent.",
      });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: { otp, otpExpiresAt },
    });

    await sendOtpEmail(email, otp);

    res.status(200).json({
      success: true,
      message: "If that email exists, an OTP has been sent.",
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// FORGOT PASSWORD — Step 2: Verify OTP
// ─────────────────────────────────────────
export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return next(new AppError("Email and OTP are required", 400));
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.otp || !user.otpExpiresAt) {
      return next(new AppError("Invalid or expired OTP", 400));
    }

    if (user.otp !== otp) {
      return next(new AppError("Invalid OTP", 400));
    }

    if (new Date() > user.otpExpiresAt) {
      return next(
        new AppError("OTP has expired, please request a new one", 400),
      );
    }

    const resetToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      resetToken,
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// FORGOT PASSWORD — Step 3: Set New Password
// ─────────────────────────────────────────
export const resetForgotPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      return next(new AppError("New password is required", 400));
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("No token provided", 401));
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return next(
        new AppError(
          "New password cannot be the same as previous password",
          400,
        ),
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashedPassword, otp: null, otpExpiresAt: null },
    });

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    next(error); // JWT errors handled in errorHandler
  }
};

// ─────────────────────────────────────────
// RESET PASSWORD — User is logged in
// ─────────────────────────────────────────
export const resetPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return next(
        new AppError("Current password and new password are required", 400),
      );
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("No token provided", 401));
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return next(new AppError("Current password is incorrect", 400));
    }

    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return next(
        new AppError(
          "New password cannot be the same as current password",
          400,
        ),
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashedPassword },
    });

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// GOOGLE OAUTH CALLBACK
// ─────────────────────────────────────────
export const googleAuthCallback = async (req, res, next) => {
  try {
    const user = req.user;

    const { accessToken, refreshToken } = generateTokens(user);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(
      `${process.env.CLIENT_URL}/oauth-callback?token=${accessToken}`,
    );
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// REFRESH TOKEN
// ─────────────────────────────────────────
export const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return next(new AppError("No refresh token provided", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || user.refreshToken !== token) {
      return next(new AppError("Invalid refresh token", 403));
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    res.status(200).json({ success: true, accessToken });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// LOGOUT
// ─────────────────────────────────────────
export const logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (token) {
      await prisma.user.updateMany({
        where: { refreshToken: token },
        data: { refreshToken: null },
      });
    }

    res.clearCookie("refreshToken");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

// Me
export const me = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("ME ERROR:", err);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
