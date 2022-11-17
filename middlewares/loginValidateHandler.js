/*
 * Title: Login validate handler
 * Description: Handles proper validation of login data
 * Author: Saud M.
 * Date:
 */

// Dependencies
const expressValidator = require('express-validator');

// Validation
const loginValidation = [
  expressValidator
    .check('email')
    .isLength({ min: 1 })
    .withMessage('Email is required.'),
  expressValidator
    .check('password')
    .isLength({ min: 1 })
    .withMessage('Password is required.'),
];

// Validation result
const loginValidationResult = (req, res, next) => {
  const err = expressValidator.validationResult(req);
  const mappedErr = err.mapped();

  if (Object.keys(mappedErr).length === 0) {
    next();
  } else {
    res.status(500).json({
      message: mappedErr,
    });
  }
};

// Export
module.exports = {
  loginValidation,
  loginValidationResult,
};
