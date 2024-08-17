require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const jwt = require("jsonwebtoken");
const authRouter = require("./route/authRoutes");
const userRoutes = require("./route/userRoute");
const app = express();
const questionRoutes = require("./route/questionRoutes");
const teacherRoute = require("./route/teacherRoute");
const teacherDashboardRoutes = require("./route/teacherDashboard");
const logout = require("./route/logout");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line for parsing form data

// Increase payload size limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // was false earlier but changed to true
  }),
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// JWT middleware
app.use((req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
  next();
});

// View engine setup
app.set("view engine", "ejs");

// Static files
app.use(express.static("public")); // Add this line if you have a public folder for static assets

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the homepage",
  });
});

app.use("/api", authRouter);
app.use("/api", logout);
app.use("/", userRoutes);
app.use("/api/admin/dashboard", questionRoutes); // Example endpoint, adjust URL as needed
app.use("/api/teacher/dashboard", teacherRoute);
app.use("/api/teacher/dashboard", teacherDashboardRoutes);

// Google authentication routes
app.get(
  "/continuewithgoogle",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // User successfully authenticated
    res.redirect("/success");
  },
);

// Success and login routes
app.get("/success", (req, res) => {
  res.send("Successfully logged in with Google!");
});

app.get("/login", (req, res) => {
  res.send("Login page");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Import routes
const apiRoutes = require("./route/api");

// Use routes
app.use("/api/teacher/dashboard", apiRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server }; // Export the server for testing
