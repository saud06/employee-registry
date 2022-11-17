/*
 * Title: Employees controller
 * Description: Required employees controllers for employees route
 * Author: Saud M.
 * Date:
 */

// Dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const Employee = require('../models/employee');

// Controller initialization
const employeesController = {};

// Add employee
employeesController.addEmployee = async (req, res, next) => {
  const hashedPass = await bcrypt.hash(req.body.password, 10);
  const employee = new Employee({
    ...req.body,
    password: hashedPass,
  });

  console.log(employee);
  const result = await employee.save();
  console.log(result);

  try {
    const result = await employee.save();

    res.status(200).json({
      message: 'Employee added successfully !',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Add multiple employee
employeesController.addMultipleEmployee = async (req, res, next) => {
  const hashedPass = await bcrypt.hash('12345', 10); // Set temporaty password

  try {
    async function saveData(item) {
      const employee = new Employee({
        ...item,
        password: hashedPass,
      });
  
      const result = await employee.save();
    }
    
    req.body.importedCSV.forEach(item => {
      saveData(item);
    });

    res.status(200).json({
      message: 'Employee added successfully !',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Update employee
employeesController.updateEmployee = async (req, res, next) => {
  const employeeData = await Employee.find({ email: req.body.email });
  let employee;
  
  if(employeeData[0].password !== req.body.password){
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    employee = {
      ...req.body,
      password: hashedPass,
    };
  } else{
    employee = {
      ...req.body,
    };
  }

  try {
    const result = Employee.findByIdAndUpdate({_id: req.params.id}, employee).then(doc => console.log('updated')).catch(err => console.log(err));

    res.status(200).json({
      message: 'Employee updated successfully !',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Delete employee
employeesController.deleteEmployee = async (req, res, next) => {
  try {
    const result = await Employee.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({
      status: 200,
      message: 'Employee deleted successfully.',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Get employees
employeesController.getEmployees = async (req, res, next) => {
  try {
    const result = await Employee.find();

    res.status(200).json({
      result,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Get login
employeesController.getLogin = (req, res, next) => {
  const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  const loggedInEmployeeData = res.locals.loggedInEmployeeData;
  
  res.status(200).json({
    cookies,
    loggedInEmployeeData
  });
};

// Process login
employeesController.login = async (req, res, next) => {
  try {
    // Get employee data
    const result = await Employee.findOne({
      email: req.body.email
    });

    if (result) {
      // Check password validity
      const passValidity = await bcrypt.compare(req.body.password, result.password);

      if (passValidity) {
        // Generate token
        const employeeData = {
          id: result._id,
          username: result.username,
          email: result.email,
          lname: result.lname,
          fname: result.fname,
          address: result.address,
          role: result.role,
        };

        const token = jwt.sign(employeeData, process.env.JWT_SECRET, {
          expiresIn: 3600000, // 1 hour
        });

        // Set cookie
        const cookie = res.cookie('express-app-cookie', token, {
          maxAge: 3600000, // 1 hour
          httpOnly: true,
          signed: true,
        });

        // Set local Data
        res.locals.loggedInEmployeeData = employeeData;
        
        res.status(200).json({
          message: 'Employee logged in successfully !',
        });
      } else {
        throw createError(400, 'Incorrect password.');
      }
    } else {
      throw createError(400, 'Employee not found.');
    }
  } catch {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Process logout
employeesController.logout = async (req, res, next) => {
  res.clearCookie('express-app-cookie');
  res.send('Logged out.');
};

// Export
module.exports = employeesController;