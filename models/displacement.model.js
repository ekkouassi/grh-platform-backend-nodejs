const mongoose = require('mongoose');

const displacementSchema = new mongoose.Schema({
    employee: {
        type: mongoose.ObjectId,
        required: true
    },
    destination: {
        type: String,
        required: true,
        maxlength: 200
    },
    means: {
        type: String,
        required: true,
        maxlength: 300
    },
    costs: {
        type: Number,
        required: true,
        maxLength: 10
    },
    accommodationCosts: {
        type: Number,
        required: false,
        maxLength: 6
    },
    startAt:{
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

const displacementModel = mongoose.model('displacements', displacementSchema);
module.exports = displacementModel;