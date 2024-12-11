import otplib from "otplib";
import User from "../models/user.models.js";
import { sendEmail } from "../utils/resendMailer.js";

// Register User
export const registerUser = async (req, res) => {
  const { email, password, userID } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if userID is unique
    const existingUserID = await User.findOne({ userID });
    if (existingUserID) {
      return res.status(400).json({ message: "UserID already exists" });
    }

    const newUser = new User({
      email,
      password, 
      userID, 
    });

    await newUser.save();

    console.log("User registered successfully");

    const subject = "Welcome to Our Service!";
    const welcomeMessage = `
      <html>
        <body>
          <h2>Welcome, ${email}!</h2>
          <p>Thank you for registering with our service!</p>
        </body>
      </html>
    `;
    await sendEmail(newUser.email, subject, welcomeMessage);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User and Send OTP
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const otp = otplib.authenticator.generateSecret();
    user.otp = otp;
    user.otpExpiration = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const subject = "Your OTP Code";
    const otpMessage = `
      <html>
        <body>
          <h2>Hello, ${email}!</h2>
          <p>Your OTP code is:</p>
          <h3 style="color: blue;">${otp}</h3>
          <p>This code will expire in 5 minutes.</p>
        </body>
      </html>
    `;
    await sendEmail(user.email, subject, otpMessage);

    res.json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isOtpValid = user.otp === otp && user.otpExpiration > new Date();
    if (!isOtpValid)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    user.otp = null;
    user.otpExpiration = null;
    await user.save();

    console.log("Setting session userID:", user._id);
    req.session.userID = user._id;
    console.log("Session after setting userID:", req.session);

    console.log("OTP verified successfully, login successful");

    res.json({ message: "OTP verified successfully, login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout User
export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
};

// Check if user is authenticated
export const isAuthenticated = (req, res) => {
  if (req.session.userID) {
    console.log(req.session.userID, "User is authenticated");

    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
};
