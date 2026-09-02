const express = require("express");
const cors = require("cors");
const sessionConfig = require("./config/session");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      "authenticationproject-b9z4fwp4i-alone-lover.vercel.app",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionConfig);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running!",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
