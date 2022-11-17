/*
 * Title: Employeess router
 * Description: Hits here when the client requests for employees
 * Author: Saud M.
 * Date:
 */

// Dependencies
const express = require('express');
const responseType = require('../middlewares/responseTypeHandler');
const loggedInEmployeeHandler = require('../middlewares/loggedInEmployeeHandler');
const { employeeSignupValidation, employeeAddValidation, employeeUpdateValidation, employeeValidationResult } = require('../middlewares/employeeValidateHandler');
const { loginValidation, loginValidationResult } = require('../middlewares/loginValidateHandler');
const employeesController = require('../controllers/employees');

// Router initialization
const router = express.Router();

// Post employee
router.post(
  '/signup',
  employeeSignupValidation,
  employeeValidationResult,
  employeesController.addEmployee
);

router.post(
  '/add',
  loggedInEmployeeHandler.checkAvailability,
  employeeAddValidation,
  employeeValidationResult,
  employeesController.addEmployee
);

router.post(
  '/addMultiple',
  loggedInEmployeeHandler.checkAvailability,
  employeesController.addMultipleEmployee
);

// Get employees
router.get(
  '/list',
  responseType.setResponse,
  loggedInEmployeeHandler.checkAvailability,
  employeesController.getEmployees
);

// Update employee
router.put(
  '/update/:id',
  employeeUpdateValidation,
  employeeValidationResult,
  employeesController.updateEmployee
);

// Delete employee
router.delete(
  '/delete/:id',
  employeesController.deleteEmployee
);

// Get login
router.get(
  '/login',
  responseType.setResponse,
  loggedInEmployeeHandler.checkAvailability,
  employeesController.getLogin
);

// Post login
router.post(
  '/login',
  responseType.setResponse,
  loginValidation,
  loginValidationResult,
  employeesController.login
);

// Logout
router.delete(
  '/logout',
  employeesController.logout
);

// Export
module.exports = router;