const jwt = require("jsonwebtoken");

//middleware for checking if user is registered 
const isUserRegistered = (req, res, next) => {
  try {
    //using token from headers in request object
    const registerToken = req.headers.token;
    //verifying token
    const user = jwt.verify(registerToken, process.env.JWT_KEY);
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

module.exports = isUserRegistered;
