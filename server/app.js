const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// importing routes
const user = require("./routes/userRoutes");

// Adding to Routes
app.use("/api/v1", user);

module.exports = app;
