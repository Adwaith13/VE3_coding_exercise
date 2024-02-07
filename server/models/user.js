const mongoose = require("mongoose");

//user schema for storing users
const userSchema = new mongoose.Schema({
  email_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
