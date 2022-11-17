/*
 * Title: Employee validate handler
 * Description: Handles proper validation of employee data
 * Author: Saud M.
 * Date:
 */

// Dependencies
const expressValidator = require('express-validator');
const createError = require('http-errors');
const Employee = require('../models/employee');

// Validation
const employeeSignupValidation = [
  expressValidator
    .check('lname')
    .isLength({ min: 1 })
    .withMessage('Last name is required.')
    .isAlpha()
    .withMessage('Last name can contain alphabets only.')
    .trim(),
  expressValidator
    .check('fname')
    .isLength({ min: 1 })
    .withMessage('First name is required.')
    .isAlpha()
    .withMessage('First name can contain alphabets only.')
    .trim(),
  expressValidator
    .check('email')
    .isLength({ min: 1 })
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Invalid email address.')
    .trim()
    .custom(async (value) => {
      try {
        const email = await Employee.find({ email: value });

        if (email.length > 0) {
          throw createError(400, 'Email already exists.');
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  expressValidator
    .check('password')
    .isLength({ min: 1 })
    .withMessage('Password is required.')
];

const employeeAddValidation = [
  expressValidator
    .check('username')
    .isLength({ min: 1 })
    .withMessage('Username is required.')
    .isAlphanumeric('en-US', { ignore: ' -' })
    .withMessage('Username can contain alphabets & numbers only.')
    .trim(),
  expressValidator
    .check('lname')
    .isLength({ min: 1 })
    .withMessage('Last name is required.')
    .isAlpha()
    .withMessage('Last name can contain alphabets only.')
    .trim(),
  expressValidator
    .check('fname')
    .isLength({ min: 1 })
    .withMessage('First name is required.')
    .isAlpha()
    .withMessage('First name can contain alphabets only.')
    .trim(),
  expressValidator
    .check('email')
    .isLength({ min: 1 })
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Invalid email address.')
    .trim()
    .custom(async (value) => {
      try {
        const email = await Employee.find({ email: value });

        if (email.length > 0) {
          throw createError(400, 'Email already exists.');
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  expressValidator
    .check('password')
    .isLength({ min: 1 })
    .withMessage('Password is required.')
];

const employeeUpdateValidation = [
  expressValidator
    .check('username')
    .isLength({ min: 1 })
    .withMessage('Username is required.')
    .isAlphanumeric('en-US', { ignore: ' -' })
    .withMessage('Username can contain alphabets & numbers only.')
    .trim(),
  expressValidator
    .check('lname')
    .isLength({ min: 1 })
    .withMessage('Last name is required.')
    .isAlpha()
    .withMessage('Last name can contain alphabets only.')
    .trim(),
  expressValidator
    .check('fname')
    .isLength({ min: 1 })
    .withMessage('First name is required.')
    .isAlpha()
    .withMessage('First name can contain alphabets only.')
    .trim(),
  expressValidator
    .check('email')
    .isLength({ min: 1 })
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Invalid email address.')
    .trim(),
];

// Validation result
const employeeValidationResult = (req, res, next) => {
  const err = expressValidator.validationResult(req);
  const mappedErr = err.mapped();

  console.log(mappedErr);

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
  employeeSignupValidation,
  employeeAddValidation,
  employeeUpdateValidation,
  employeeValidationResult,
};
