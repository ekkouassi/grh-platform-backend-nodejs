const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            maxLength: 150,
            unique: true
        },
        slug:{
            type: String,
            required: true,
            maxLength: 200,
            unique: true
        },
        description: {
            type: String,
            maxLength: 400
        }
    },
    {
        timestamps: true
    }
);

const departmentModel = mongoose.model('department', departmentSchema);
module.exports = departmentModel;