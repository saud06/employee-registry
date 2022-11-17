/*
 * Title: Employee details controller
 * Description: Required details controllers for details route
 * Author: Saud M.
 * Date:
 */

// Dependencies
const createError = require('http-errors');
const Comment = require('../models/comment');
const Employee = require('../models/employee');

// Controller initialization
const detailsController = {};

// Get employee details
detailsController.getEmployeeDetails = async (req, res, next) => {
  try {
    const result = await Employee.findById({ _id: req.params.id });

    res.status(200).json({
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Get comments
detailsController.getComments = async (req, res, next) => {
  try {
    const result = await Comment.find({'commentedTo._id': req.params.id}).sort({createdAt: -1});

    res.status(200).json({
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Add comment
detailsController.addComment = async (req, res, next) => {
  if (req.body.comment) {
    try {
      // Get employee data
      const employeeDataBy = await Employee.find({'_id': req.body.commentAdditionalData[0]});
      const employeeDataTo = await Employee.find({'_id': req.body.commentAdditionalData[1]});

      const commentedByName = `${employeeDataBy[0].fname} ${employeeDataBy[0].lname}`;
      const commentedToName = `${employeeDataTo[0].fname} ${employeeDataTo[0].lname}`;

      const comment = new Comment({
        text: req.body.comment,
        commentedBy: {
          id: req.body.commentAdditionalData[0],
          name: commentedByName,
        },
        commentedTo: {
          id: req.body.commentAdditionalData[1],
          name: commentedToName,
        },
      });

      const result = await comment.save();

      res.status(200).json({
        message: 'Comment added successfully !',
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  } else {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Export
module.exports = detailsController;