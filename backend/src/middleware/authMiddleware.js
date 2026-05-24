const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  try {

    // Get token
    const token = req.headers.authorization;

    // Check token
    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
      });

    }

    // Verify token
    const decoded = jwt.verify(token, "SECRET_KEY");

    // Attach user
    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      success: false,
      message: "Invalid token"
    });

  }

};

module.exports = authMiddleware;