const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/password");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../utils/validators");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const validation = validateRegisterInput({ name, email, password });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedName = name.trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validation = validateLoginInput({ email, password });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password",
    );
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    req.session.regenerate((err) => {
      if (err) {
        return next(err);
      }
      req.session.userId = user._id.toString();
      user.lastLogin = new Date();
      user
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              isVerified: user.isVerified,
            },
          });
        })
        .catch(next);
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  if (!req.session) {
    return res.status(200).json({
      success: true,
      message: "Already logged out",
    });
  }
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }

    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });
};

const getMe = async (req, res, next) => {
  try {
    //requireAuth middleware puts the user into req.user
    return res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        isVerified: req.user.isVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
};
