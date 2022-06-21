const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// importing routes
const admin = require("./routes/adminRoutes");
const user = require("./routes/userRoutes");
const device = require("./routes/deviceRoutes");

app.use("/api/v1", admin);
app.use("/api/v1", user);
app.use("/api/v1", device);
app.get("*", (req, res) => {
  res.send("Server is working");
});

app.use(cors());

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
