const mongoose = require('mongoose');

const additionalHourSchema = new mongoose.Schema({
    patterns: {
        type: String,
        required: true,
        maxlength: 300
    },
    startAt: {
        type: Date,
        required: true
    },
    endAt: {
        type: Date,
        required: true
    },
    employee: {
        type: mongoose.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

const additionalHourModel = mongoose.model('additional_our', additionalHourSchema);
module.exports = additionalHourModel;