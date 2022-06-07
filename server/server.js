const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
// handling uncotch Expantions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shuting Down the server due to uncaughtException`);
  process.exit(1);
});

//config
dotenv.config({ path: "server/config/config.env" });
//db connection;
connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Runing on Port: ${process.env.PORT}`);
});

// Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shuting Down the server due to Unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
