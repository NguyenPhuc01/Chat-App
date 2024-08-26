import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../ultils/generateToken.js";

export const login = async (req, res) => {
  res.send("Login Page");
};
export const logout = async (req, res) => {
  res.send("logout Page");
};
export const signup = async (req, res) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;
  try {
    if (!confirmPassword || !fullName || !username || !password || !gender) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }
    const userAlreadyExists = await User.findOne({ username });
    console.log("🚀 ~ signup ~ userAlreadyExists:", userAlreadyExists);
    if (userAlreadyExists) {
      return res.status(400).json({ message: "Username already exists" });
    }
    // hash the password

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...newUser._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error created user", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
