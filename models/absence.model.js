const mongoose = require('mongoose');

const absenceSchema = new mongoose.Schema({
    startAt: {
        type: Date,
        required: true
    },
    endAt: {
        type: Date,
        required: true
    },
    justified: {
        type: Boolean,
        required: true
    },
    patterns: {
        type: String,
        required: true
    },
    employee: {
        type: mongoose.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

const absenceModel = mongoose.model('absence', absenceSchema);
module.exports = absenceModel;