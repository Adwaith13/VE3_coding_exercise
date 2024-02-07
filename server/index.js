//using all required packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectMongoDB } = require("./utils/mongoDBConnection");
const authenticationRoute = require("./routes/auth");
const taskRoute = require("./routes/tasks");

//using environment variables
dotenv.config();

//initializing an express application 
const app = express();

//middlwares
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connecting mongodb
connectMongoDB();

//route to check if server is working
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "server running",
  });
});

//using routes
app.use("/", authenticationRoute);
app.use("/", taskRoute);

//starting server
app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
