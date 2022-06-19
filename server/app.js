const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const errorMiddleware = require("./middlewares/error");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// importing routes
const admin = require('./routes/adminRoutes')
const user = require("./routes/userRoutes");

app.use("/api/v1", admin);
app.use("/api/v1", user);
app.get("*", (req, res) => {
    res.send("Server is working");
});

app.use(cors());

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
