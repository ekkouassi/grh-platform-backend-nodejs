const mongoose = require('mongoose');
const {isEmail} = require('validator');

const employeeSchema = new mongoose.Schema({
    /* Personal information */
    civility:{
        type: String,
        required: true,
        enum: ["M.","Mme","Mlle"],
        maxLength: 60
    },
    firstName: {
        type: String,
        required: true,
        maxLength: 150
    },
    lastName:{
        type: String,
        required: true,
        maxLength: 80
    },
    country:{
        type: String,
        maxLength: 100,
        default: 'Côte d\'Ivoire'
    },
    city: {
        type: String,
        required: true,
        maxLength: 100,
        default: 'Abidjan'
    },
    residentialCommune:{
        type: String,
        required: true,
        maxLength: 150,
        default: 'Marcory'
    },
    residenceDistrict:{
        type: String,
        required: true,
        maxLength: 200,
        default: 'Marcory - remblais chatelet'
    },
    homePhone: {
        type: String,
        maxLength: 20
    },
    mobilePhone: {
        type: String,
        required: true,
        unique: true,
        maxLength: 20
    },
    birthDate: {
        type: Date,
        required: true
    },
    maritalStatus:{
        type: String,
        required: true,
        enum: ["MARRIED","SINGLE","WIDOWED","DIVORCED","SEPARATED","BETROTHED"],
        maxLength: 60
    },
    spouseName:{
        type: String,
        required: false,
        maxLength: 200
    },
    /* Job information */
    positionTitle:{
        type: String,
        required: true,
        maxLength: 100
    },    
    specialityId: {
        type: mongoose.ObjectId,
        required: true
    },
    manager:{
        type: String,
        required: true,
        maxLength: 200
    },
    deskPhone:{
        type: String,
        required: false,
        maxLength: 20
    },
    deskMobile: {
        type: String,
        required: false,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 120,
        validate: isEmail
    },
    startDate:{
        type: Date,
        required: true
    },
    documents:{
        type: [],
        required: false
    },
     /* Emergency contact */
    emergencyContactFullName: {
        type: String,
        required: true,
        maxLength: 255
    },
    emergencyContactAddress:{
        type: String,
        required: true
    },
    emergencyContactPhone:{
        type: String,
        required: true,
        maxLength: 100
    },
    relationship: {
        type: String,
        required: true,
        maxLength: 80
    }
},
    { timestamps: true });

const employeeModel = mongoose.model('employees', employeeSchema);
module.exports = employeeModel;