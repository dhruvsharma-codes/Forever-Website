import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ─── helpers ───────────────────────────────────────────────
const createToken = (user) => {
  // Include id AND email so frontend can decode profile info from token
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" },
  );
};

// ─── LOGIN ─────────────────────────────────────────────────
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials." });
    }

    const token = createToken(user);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ─── REGISTER ──────────────────────────────────────────────
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists." });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email.",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = createToken(user);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ─── ADMIN LOGIN ───────────────────────────────────────────
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
      });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials." });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ─── CHANGE PASSWORD ───────────────────────────────────────
// authUser middleware sets req.body.userId — use that consistently
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "Unauthorized." });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    if (newPassword.length < 6) {
      return res.json({
        success: false,
        message: "New password must be at least 6 characters.",
      });
    }

    // Prevent reuse of same password
    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return res.json({
        success: false,
        message: "New password cannot be the same as current password.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await userModel.findByIdAndUpdate(userId, { password: hashedNewPassword });

    res.json({ success: true, message: "Password changed successfully." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ─── GET USER PROFILE ──────────────────────────────────────
// Returns safe profile data (no password)
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).select("-password");
    if (!user) return res.json({ success: false, message: "User not found." });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { LoginUser, registerUser, adminLogin, changePassword, getUserProfile };
