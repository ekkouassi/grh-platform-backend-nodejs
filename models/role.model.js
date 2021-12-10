const mongoose = require('mongoose');


const roleSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true,
            emun: ["ADMIN_ROLE","USER_ROLE", "DEFAULT_ROLE"],
            maxlength: 30,
            unique: true,
        },

        clearance: {
            type: String,
            maxlength: 255,
            required: true
        }
    },

    {
        timestamps: true
    }
);

const roleModel = mongoose.model('role', roleSchema);

module.exports = roleModel;