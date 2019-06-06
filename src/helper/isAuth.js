const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      error: "No token, authorization denied",
      data: null
    });
  }

  try {
    // Verify User Token
    const decoded = jwt.verify(token, SECRET_KEY);
    // Add User to payload
    req.user = decoded;

    // return next middleware
    return next();
  } catch (err) {
    if (err) {
      return res.status(401).json({
        statusCode: 401,
        error: "Invalid token",
        data: null
      });
    }
  }
};
