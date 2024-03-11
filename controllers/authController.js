const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "* Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = jwt.generateToken({ userId: user._id, userName: user.name });
    res.status(201).json({
      message: "User registered successfully",
      token: token,
      userName: user.name,
    });
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "* User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "* Invalid credentials" });
    }
    const token = jwt.generateToken({ userId: user._id, username: user.name });
    return res.status(200).json({
      message: "User login successfull",
      token: token,
      userName: user.name,
    });
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({ message: "Login failed" });
  }
};

module.exports = { register, login };
