const express = require("express");

const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", requireAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      isVerified: req.user.isVerified,
    },
  });
});

router.get("/dashboard", requireAuth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "User dashboard fetched successfully",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      isVerified: req.user.isVerified,
    },
  });
});

module.exports = router;
