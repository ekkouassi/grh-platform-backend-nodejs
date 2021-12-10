const mongoose = require('mongoose');

const bonusSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    patterns: {
        type: String,
        required: true,
        maxlength: 300
    },
    employee: {
        type: mongoose.ObjectId,
        required: true
    }
}, { timestamps: true });

const bonusModel = mongoose.model('bonus', bonusSchema);
module.exports = bonusModel;