const isUserLoggedIn = require("./isUserLoggedIn");
const isUserRegistered = require("./isUserRegistered");

//middleware to check if user is authenicated
const isUserAuthenticated = (req, res, next) => {
  //accessing token from headers in request object
  const loginToken = req.headers.token;
  const registerToken = req.headers.token;
  
  //checking if login token or register token exists
  if (loginToken) {
    //if login token is present then 
    return isUserLoggedIn(req, res, next);
  } else if (registerToken) {
    //if register token is present
    return isUserRegistered(req, res, next);
  } else {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized",
    });
  }
};

module.exports = isUserAuthenticated;
