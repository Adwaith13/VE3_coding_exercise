const jwt = require("jsonwebtoken");

//middleware for checking if user is logged in
const isUserLoggedIn = (req, res, next) => {
  try {
    //using token from headers in request object
    const loginToken = req.headers.token;

    //verifying token
    const user = jwt.verify(loginToken, process.env.JWT_KEY);
    //assigning user to the request object
    req.user = user;
    //next function to pass the control to next middleware
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "failed",
      message: "user unauthorized",
    });
  }
};

module.exports = isUserLoggedIn;
