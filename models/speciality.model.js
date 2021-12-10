const mongoose = require('mongoose');

const specialitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 150,
            unique: true,
            required: true
        },
        slug: {
            type: String,
            unique: true,
            required: true
        },
        departmentId: {
            type: mongoose.ObjectId,
            required: true
        },
        description: {
            type: String,
            maxLength: 255
        }
    },
    {
        timestamps: true
    }
);

const specialityModel = mongoose.model('speciality', specialitySchema);
module.exports = specialityModel;