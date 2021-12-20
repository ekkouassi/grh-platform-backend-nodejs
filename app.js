const express = require('express');
const path = require('path');
require('dotenv').config({ path: './.env' });
require('./configs/database');
const expressFileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const usersRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const roleRouter = require('./routes/role.route');
const departmentRouter = require('./routes/department.route');
const specialityRouter = require('./routes/speciality.route');
const employeeRouter = require('./routes/employee.route');
const trainingRouter = require('./routes/training.route');
const additionHourRouter = require('./routes/additionalHour.route');
const bonusRouter = require('./routes/bonus.route');
const wageRouter = require('./routes/wage.route');
const displacementRouter = require('./routes/displacement.route');
const absenceRouter = require('./routes/absence.route');
const departureRouter = require('./routes/departure.route');
const leaveRouter = require('./routes/leave.route');
const authorize = require('./middleware/authorize');


let app = express();

const corsOptions = {
    "origin": process.env.CLIENT_URL,
    "methods": "POST, PUT, GET, DELETE, PATCH",
    "preflightContinue": false,
    "optionsSuccessStatus": 200,
    "credentials": true
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressFileUpload( { limits: {fileSize: 65536} }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));
  

// ROUTING

// AUTH ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/auth`, authRouter);

// USERS ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/users`, authorize(), usersRouter);

// ROLES ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/roles`, authorize(), roleRouter);

// DEPARTMENT ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/departments`, authorize(), departmentRouter);

// SPECIALITY ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/specialities`, authorize(), specialityRouter);

// EMPLOYEE ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/employees`, authorize(), employeeRouter);

// TRAINING ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/trainings`, authorize(), trainingRouter);

// ADDITION HOURS ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/additional-hours`, authorize(), additionHourRouter)

// BONUS ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/bonuses`, authorize(), bonusRouter);

// WAGE ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/wages`, authorize(), wageRouter);

// DISPLACEMENT ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/displacements`, authorize(), displacementRouter);

// ABSENCE ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/absences`, authorize(), absenceRouter);

// DEPARTURE ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/departures`, authorize(), departureRouter);

// LEAVE ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/leaves`, authorize(), leaveRouter);

module.exports = app;
