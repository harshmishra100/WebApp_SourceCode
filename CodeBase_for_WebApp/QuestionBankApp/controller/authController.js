const { users } = require("../db/models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "90d",
  });
};
const Signup = async (req, res, next) => {
  const body = req.body;
  if (!["teacher"].includes(body.userType)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid user type",
    });
  }

  const newuser = await users.create({
    userType: body.userType,
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword,
  });

  const result = newuser.toJSON();
  delete result.password;
  delete result.confirmPassword;
  result.token = generateToken({
    id: result.id,
  });

  if (!result) {
    return res.status(400).json({
      status: "error",
      message: "Failed to create user",
    });
  }
  return res.status(201).json({
    status: "success",
    message: "User created successfully",
    data: result,
  });
};

const Login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }

  async function hashPassword(password2) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password2, salt);
      return hash;
    } catch (err) {
      console.error("Error hashing password:", err);
      throw err;
    }
  }

  // Usage:
  hashPassword(password)
    .then((hash) => {
      console.log(hash); // Store the hash in your database
    })
    .catch((err) => {
      console.error("Error:", err);
    });

  const result = await users.findOne({ where: { email } });
  if (!result || !(await bcrypt.compare(password, result.password))) {
    return res.status(401).json({
      status: "Not Found",
      message: "Incorrect Email or Password",
    });
  }

  const token = generateToken({
    id: result.id,
    userType: result.userType,
  });

  if (result.userType === "admin") {
    return res.json({
      status: "success",
      message: "Login successful",
      token,
      redirect: "/admin/dashboard",
    });
  } else if (result.userType === "teacher") {
    return res.json({
      status: "success",
      message: "Login successful",
      token,
      redirect: "/teacher/dashboard",
    });
  }
};

module.exports = { Signup, Login };
