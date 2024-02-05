const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const { email_id, password } = req.body;
    if (!email_id || !password) {
      return res.json({
        status: "failed",
        message: "email and password required",
      });
    }

    const email_id_Exists = await User.findOne({ email_id });
    if (email_id_Exists) {
      return res.status(500).json({
        status: "failed to create new user",
        message: "user already exists",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const createNewUser = await User.create({
      email_id,
      password: encryptedPassword,
    });

    const registerToken = jwt.sign(createNewUser.toJSON(), process.env.key, {
      expiresIn: 14400,
    });

    return res.status(200).json({
      status: "success",
      user: email_id,
      registerToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email_id, password } = req.body;

    if (!email_id || !password) {
      return res.status(500).json({
        status: "failed",
        message: "both the fields are required",
      });
    }

    const doesEmail_ID_Exist = await User.findOne({ email_id });

    if (!doesEmail_ID_Exist) {
      return res.status(401).json({
        status: "failed",
        message: "authentication failed",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      doesEmail_ID_Exist.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "failed",
        message: "authentication failed",
      });
    }

    const loginToken = jwt.sign(doesEmail_ID_Exist.toJSON(), process.env.key, {
      expiresIn: 14400,
    });

    return res.status(200).json({
      status: "success",
      message: "user logged in",
      user: doesEmail_ID_Exist.email_id,
      loginToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
});

module.exports = router;
