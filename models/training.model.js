const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    startAt: {
        type: Date,
        required: true
    },
    endAt: {
        type: Date,
        required: true
    },
    employee:{
        type: mongoose.ObjectId
    }
}, { timestamps: true });

const trainingModel = mongoose.model('training', trainingSchema);
module.exports = trainingModel;