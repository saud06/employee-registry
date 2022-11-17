/*
 * Title: Employees details router
 * Description: Hits here when the client requests for employee details
 * Author: Saud M.
 * Date:
 */

// Dependencies
const express = require('express');
const responseType = require('../middlewares/responseTypeHandler');
const loggedInEmployeeHandler = require('../middlewares/loggedInEmployeeHandler');
const detailsController = require('../controllers/details');

// Router initialization
const router = express.Router();

// Get employee details
router.get(
  '/:id',
  responseType.setResponse,
  loggedInEmployeeHandler.checkAvailability,
  detailsController.getEmployeeDetails
);

// Get comments
router.get(
  '/commentList/:id',
  responseType.setResponse,
  loggedInEmployeeHandler.checkAvailability,
  detailsController.getComments
);

// Add comment
router.post(
  '/addComment',
  loggedInEmployeeHandler.checkAvailability,
  detailsController.addComment
);

// Export
module.exports = router;