const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    const mongoDBURL = process.env.MONGODB_URL;
    await mongoose.connect(mongoDBURL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Connection failed");
    console.log(error);
  }
};

module.exports = { connectMongoDB };
