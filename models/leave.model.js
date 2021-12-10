const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    employee: {
        type: mongoose.ObjectId,
        required: true
    },
    patterns: {
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
    }
}, {
    timestamps: true
});

const leaveModel = mongoose.model('leave', leaveSchema);
module.exports = leaveModel;