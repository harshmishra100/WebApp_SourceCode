const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/middleware");
const {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  bulkUploadQuestions,
} = require("../controller/questionController");
const { addAdmin } = require("../controller/Admin");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

// Middleware to check admin status
router.use(isAdmin);

router.post("/questions", createQuestion);
router.get("/questions", getAllQuestions);
router.put("/questions/:id", updateQuestion);
router.delete("/questions/:id", deleteQuestion);
router.post(
  "/questions/bulk-upload",
  upload.single("file"),
  bulkUploadQuestions,
);
router.post("/add-admin", addAdmin);

module.exports = router;
