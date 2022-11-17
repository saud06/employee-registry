/*
 * Title: Logged in employee handler
 * Description: Checks whether a employee is logged in or not
 * Author: Saud M.
 * Date:
 */

// Dependencies
const jwt = require('jsonwebtoken');

// Middleware initialization
const loggedInEmployeeHandler = {};

// Check if the employee logged in
loggedInEmployeeHandler.checkAvailability = (req, res, next) => {
  const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if(cookies) {
    try {
      const token = cookies['express-app-cookie'];
      const extractedEmployeeData = jwt.verify(token, process.env.JWT_SECRET);

      req.employee = extractedEmployeeData;
      
      res.locals.loggedInEmployeeData = extractedEmployeeData;

      next();
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  } else {
    next();
  }
};

// Export
module.exports = loggedInEmployeeHandler;
