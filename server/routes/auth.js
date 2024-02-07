const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// register route
router.post("/register", async (req, res) => {
  try {
    //reading the input of user
    const { email_id, password } = req.body;

    //checking if both fields are not filled
    if (!email_id || !password) {
      return res.json({
        status: "failed",
        message: "email and password required",
      });
    }

    //checking if email exists
    const email_id_Exists = await User.findOne({ email_id });

    //if email exists failing the authentication
    if (email_id_Exists) {
      return res.status(500).json({
        status: "failed to create new user",
        message: "user already exists",
      });
    }

    //encrypting the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    //creating new user
    const createNewUser = await User.create({
      email_id,
      password: encryptedPassword,
    });

    //assigning a token using jwt to a user
    const registerToken = jwt.sign(
      createNewUser.toJSON(),
      process.env.JWT_KEY,
      {
        expiresIn: 14400,
      }
    );

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

//login route
router.post("/login", async (req, res) => {
  try {
    //reading the input of user
    const { email_id, password } = req.body;

    //checking if both fields are filled
    if (!email_id || !password) {
      return res.status(500).json({
        status: "failed",
        message: "both the fields are required",
      });
    }

    //checking if email exists
    const doesEmail_ID_Exist = await User.findOne({ email_id });

    //if email does not exist failing the authentication
    if (!doesEmail_ID_Exist) {
      return res.status(401).json({
        status: "failed",
        message: "authentication failed",
      });
    }

    //validating password
    const isPasswordValid = await bcrypt.compare(
      password,
      doesEmail_ID_Exist.password
    );

    //if password is not valid failing authentication
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "failed",
        message: "authentication failed",
      });
    }

    //assigning token to user using jwt
    const loginToken = jwt.sign(
      doesEmail_ID_Exist.toJSON(),
      process.env.JWT_KEY,
      {
        expiresIn: 14400,
      }
    );

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
