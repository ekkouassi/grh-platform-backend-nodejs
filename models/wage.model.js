const mongoose = require('mongoose');

const wageSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    employee:{
        type: mongoose.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

const wageModel = mongoose.model('wage', wageSchema);
module.exports = wageModel;