// controllers/admin.js
const { users } = require("../db/models");
const bcrypt = require("bcryptjs");

const addAdmin = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    //const hashedPassword = await bcrypt.hash(password);

    // Create new admin user
    const newUser = await users.create({
      userType: "admin",
      firstname,
      lastname,
      email,
      password,
      //: hashedPassword,
    });

    res.status(201).json({ message: "Admin created successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addAdmin,
};
