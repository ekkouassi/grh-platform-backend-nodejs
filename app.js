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
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/users`, usersRouter);

// ROLES ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/roles`, roleRouter);

// DEPARTMENT ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/departments`, departmentRouter);

// SPECIALITY ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/specialities`, specialityRouter);

// EMPLOYEE ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/employees`, employeeRouter);

// TRAINING ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/trainings`, trainingRouter);

// ADDITION HOURS ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/additional-hours`, additionHourRouter)

// BONUS ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/bonuses`, bonusRouter);

// WAGE ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/wages`, wageRouter);

// DISPLACEMENT ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/displacements`, displacementRouter);

// ABSENCE ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/absences`, absenceRouter);

// DEPARTURE ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/departures`, departureRouter);

// LEAVE ROUTES
app.use(`/${process.env.API_VERSION}/${process.env.API_PROTOCOL}/leaves`, leaveRouter);

module.exports = app;
