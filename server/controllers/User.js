import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {generateOtp} from '../utils/otpGenerator.js'
import { sendEmail} from '../utils/sendEmail.js';
import jwt from "jsonwebtoken";
import generateToken from '../utils/generateToken.js'
import Streak from "../models/Streak.js";
import AttendanceCategory from "../models/AttendanceCategory.js";
import AttendanceRecord from "../models/AttendanceRecord.js";
import mongoose from "mongoose";



export const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone){
    return res
      .status(400)
      .json({ message: "Name, email, password and phone required" });
  }
  try {
    let user = await User.findOne({ email });
    if (user){
      console.log("User already exists with this email");
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const otpCode = generateOtp();
    if (!otpCode)
      return res.status(500).json({ message: "Failed to generate OTP" });

    const otpExpire = Date.now() + 10 * 60 * 1000;

    user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      otp: { code: otpCode, expiresAt: otpExpire },
      isVerified: false,
    });

    await user.save();
    console.log("User created:", user);
    console.log("Sending email to:", user.email);

    
    await sendEmail(
      {
  email: user.email,
  subject: "Verify Your Account",
  text: `Your OTP is: ${otpCode}`,
  html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
    <h2>AttendX</h2>
    <p style="margin: 5px 0 0;">Verify Your Account</p>
  </div>
  <div style="padding: 30px; text-align: center;">
    <p style="font-size: 16px; color: #333;">Hello,</p>
    <p style="font-size: 16px; color: #333;">Please use the OTP below to verify your AttendX account:</p>
    <p style="font-size: 28px; font-weight: bold; color: #4CAF50; margin: 20px 0;">${otpCode}</p>
    <p style="font-size: 14px; color: #666;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
    <a href="#" style="display: inline-block; margin-top: 20px; padding: 12px 25px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to AttendX</a>
  </div>
  <div style="background-color: #f5f5f5; text-align: center; padding: 15px; font-size: 12px; color: #999;">
    © 2025 AttendX. All rights reserved.
  </div>
</div>
`
}
    );
    console.log("Email sent successfully");
    
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } 
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully. OTP sent to email.",
      userId: user._id,
      token, 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    
    if (!user.isVerified) {
      return res.status(403).json({ message: "Account not verified. Please verify OTP." });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    
    const token = generateToken(user);
    if (!token) return res.status(500).json({ message: "Failed to generate token" });

    
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      userId: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const googleAuth = async (req, res) => {
    const { name , email} = req.body;
    if (!name || !email)
      return res.status(400).json({ message: "Name and email required" });
    try {
        const user = await User.findOne({ email });
        if (!user){
            const newUser = await User.create({
                name,
                email,
                isVerified: true,
            });
        }
        const token = generateToken(user);
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            console.log("Google registration successful");
            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                userId: user._id,
                name: user.name,
                email: user.email,
            });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Logout failed" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-otp -password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    
    if (!user.otp || user.otp.code !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    
    if (user.otp.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    
    user.isVerified = true;
    user.otp = { code: null, expiresAt: null }; 
    await user.save();

    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      userId: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const resendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    
    const newOtp = generateOtp();
    if (!newOtp) return res.status(500).json({ message: "Failed to generate OTP" });

    user.otp = {
      code: newOtp,
      expiresAt: Date.now() + 10 * 60 * 1000, 
    };

    await user.save();

    
    await sendEmail({
  email: user.email,
  subject: "Verify Your Account",
  text: `Your OTP is: ${newOtp}`,
  html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
    <h2>AttendX</h2>
    <p style="margin: 5px 0 0;">Verify Your Account</p>
  </div>
  <div style="padding: 30px; text-align: center;">
    <p style="font-size: 16px; color: #333;">Hello,</p>
    <p style="font-size: 16px; color: #333;">Please use the OTP below to verify your AttendX account:</p>
    <p style="font-size: 28px; font-weight: bold; color: #4CAF50; margin: 20px 0;">${newOtp}</p>
    <p style="font-size: 14px; color: #666;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
    <a href="#" style="display: inline-block; margin-top: 20px; padding: 12px 25px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to AttendX</a>
  </div>
  <div style="background-color: #f5f5f5; text-align: center; padding: 15px; font-size: 12px; color: #999;">
    © 2025 AttendX. All rights reserved.
  </div>
</div>
`
});

    res.status(200).json({ success: true, message: "OTP resent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    
    const resetOtp = generateOtp();
    if (!resetOtp) return res.status(500).json({ message: "Failed to generate OTP" });

    user.otp = {
      code: resetOtp,
      expiresAt: Date.now() + 10 * 60 * 1000, 
    };

    await user.save();

    
    await sendEmail(
      {
  email: user.email,
  subject: "Verify Your Account",
  text: `Your RESET OTP is: ${resetOtp}`,
  html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
    <h2>AttendX</h2>
    <p style="margin: 5px 0 0;">Verify Your Account</p>
  </div>
  <div style="padding: 30px; text-align: center;">
    <p style="font-size: 16px; color: #333;">Hello,</p>
    <p style="font-size: 16px; color: #333;">Please use the RESET OTP below to change your AttendX account password:</p>
    <p style="font-size: 28px; font-weight: bold; color: #4CAF50; margin: 20px 0;">${resetOtp}</p>
    <p style="font-size: 14px; color: #666;">This OTP is valid for 10 minutes. Do not share it with anyone.</p>
    <a href="#" style="display: inline-block; margin-top: 20px; padding: 12px 25px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to AttendX</a>
  </div>
  <div style="background-color: #f5f5f5; text-align: center; padding: 15px; font-size: 12px; color: #999;">
    © 2025 AttendX. All rights reserved.
  </div>
</div>
`
}
    );

    res.status(200).json({
      success: true,
      message: "Password reset OTP sent to email",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;

  if (!email || !otp || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    
    if (!user.otp || user.otp.code !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    
    if (user.otp.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    
    user.password = hashedPassword;
    user.otp = { code: null, expiresAt: null }; 
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user.id; 
  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "New password and confirm password do not match" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    let { name, phone } = req.body || {};

    
    if (
      (name === undefined || name === null || `${name}`.trim() === "") &&
      (phone === undefined || phone === null || `${phone}`.trim() === "")
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one field (name or phone) is required",
      });
    }

    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    
    if (typeof name === "string") name = name.trim();
    if (typeof phone === "string") phone = phone.trim();

    
    if (phone) {
      const cleanPhone = phone.replace(/\s+/g, "");
      if (cleanPhone.length < 7 || cleanPhone.length > 15) {
        return res.status(400).json({ success: false, message: "Invalid phone number" });
      }
      phone = cleanPhone;
    }

    
    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email, 
        phone: user.phone,
        isVerified: user.isVerified,
      },
    });
  } catch (err) {
    console.error("Error updating user details:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


export const deleteAccount = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  let session = null;

  try {
    
    session = await mongoose.startSession();
    let usedTransaction = false;

    try {
      await session.withTransaction(async () => {
        
        await AttendanceRecord.deleteMany({ userId }).session(session);

        
        await AttendanceCategory.deleteMany({ userId }).session(session);

        
        await Streak.deleteMany({ userId }).session(session);

        
        await User.deleteOne({ _id: userId }).session(session);
      });

      usedTransaction = true;
    } catch (txErr) {
      
      console.warn("Transaction failed or unsupported, falling back to non-transactional delete:", txErr?.message);

      
      await AttendanceRecord.deleteMany({ userId });
      await AttendanceCategory.deleteMany({ userId });
      await Streak.deleteMany({ userId });
      await User.deleteOne({ _id: userId });
    } finally {
      session.endSession();
    }

   
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,     
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: `Account deleted successfully${session && usedTransaction ? " (transactional)" : ""}.`,
    });
  } catch (err) {
    console.error("Error deleting account:", err);
    if (session) {
      try { session.endSession(); } catch (_) {}
    }
    return res.status(500).json({
      success: false,
      message: "Failed to delete account",
      error: err.message,
    });
  }
};



export const hasPassword = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    
    const hasPassword = Boolean(user.password && user.password.trim() !== "");

    return res.status(200).json({
      success: true,
      hasPassword,
    });
  } catch (error) {
    console.error("Error in hasPassword:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while checking password",
      error: error.message,
    });
  }
};
