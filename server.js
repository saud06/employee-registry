/*
 * Title: Employee registry app landing
 * Description: Employee registry app lands here
 * Author: Saud M.
 * Date:
 */

// Dependencies
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const employees = require('./routes/employees');
const details = require('./routes/details');

// App initialization
const app = express();

// .env file
dotenv.config();

// Request parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Database connection
mongoose
  .connect(process.env.MONGO_DB_CONN_STR)
  .then(() => {
    console.log('DB connected.');
  })
  .catch((err) => {
    console.log(err);
  });

// App routes
app.use('/employees', employees);
app.use('/details', details);

// Listen to server
app.listen(process.env.PORT || 5000, () => {
  console.log('App is listening...');
});