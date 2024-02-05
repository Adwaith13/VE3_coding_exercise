const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectMongoDB } = require("./utils/mongoDBConnection");
const authenticationRoute = require("./routes/auth");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectMongoDB();

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "server running",
  });
});

app.use("/", authenticationRoute);

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
