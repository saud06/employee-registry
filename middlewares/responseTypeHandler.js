/*
 * Title: Response type handler
 * Description: Handles response types
 * Author: Saud M.
 * Date:
 */

// Middleware initialization
const responseType = {};

// Not found handler
responseType.setResponse = (req, res, next) => {
  res.locals.loggedInEmployeeData = {};
  res.locals.errors = {};
  res.locals.data = {};

  next();
};

// Export
module.exports = responseType;
