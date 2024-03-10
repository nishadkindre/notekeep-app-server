const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const Admin = require("../models/Admin");
const User = require("../models/User");
const Note = require("../models/Note");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Invalid Admin");
      return res.status(401).json({ message: "* Invalid Admin" });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      console.log("Invalid Password");
      return res.status(401).json({ message: "* Invalid credentials" });
    }
    const token = jwt.generateToken({
      adminId: admin._id,
      adminName: admin.name,
    });
    return res.status(200).json({ adminName: admin.name, admin_token: token });
  } catch (error) {
    console.error("Admin Login failed:", error);
    res.status(500).json({ message: "Admin Login failed" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ message: "Users fetched successfully", users: users });
  } catch (error) {
    console.error("Error fetching Users");
    res.status(500).json({ message: "Error fetching Users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const deletedUserNotes = await Note.deleteMany({ userId: id });
    if (!deletedUserNotes) {
      return res.status(404).json({ message: "No User Notes" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error Deleting User");
    res.status(500).json({ message: "Error Deleting User" });
  }
};

module.exports = { adminLogin, getUsers, deleteUser };
