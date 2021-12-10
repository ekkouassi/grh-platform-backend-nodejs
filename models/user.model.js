const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema(
    {
    firstName: {
        type: String,
        required: true,
        maxLength: 25,
        minLength: 3
        },

    lastName: {
            type: String,
            required: true,
            maxLength: 80
        },

    username: {
            type: String,
            required: true,
            maxLength: 25,
            minLength: 3,
            unique: true
        },

    email: {
            type: String,
            required: true,
            maxLength: 150,
            unique: true,
            validate: isEmail
        },

    password: {
            type: String,
            required: true,
            minLength: 6
        },
    avatar: {
        type: String
    },
    roles: {
        type: [],
        required: false
    },
    adminUrl: {
        type: String,
        require: false
    },
    enabled: {
        type: Boolean,
        default: false
    },
    },

    {
        timestamps: true
    }
);

// BEFORE SAVE

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

const userModel = mongoose.model('user', UserSchema);

module.exports = userModel;