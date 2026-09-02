const User = require("../models/User");
const requireAuth = async (req, res, next) => {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Please log in.",
      });
    }
    const user = await User.findById(req.session.userId);
    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { requireAuth };
