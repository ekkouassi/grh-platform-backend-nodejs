const mongoose = require('mongoose');
const {model} = require("mongoose");

const departureSchema = new mongoose.Schema({
    employee: {
        type: mongoose.ObjectId,
        required: true
    },
    patterns: {
        type: String,
        required: true
    },
    DepartureDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const departureModel = mongoose.model('departure', departureSchema);
module.exports = departureModel;