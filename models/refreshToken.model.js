const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    token: String,
    expires: Date,
    created: { type: Date, default: Date.now },
    createdByIp: String,
    revoked: Date,
    revokedByIp: String,
    replacedByToken: String
});

refreshTokenSchema.virtual('isExpired').get(() => {
    return Date.now() >= this.expires
});

refreshTokenSchema.virtual('isActive').get(() => {
    return !this.revoked && !this.isExpired;
});

module.exports = mongoose.model('refreshToken', refreshTokenSchema);