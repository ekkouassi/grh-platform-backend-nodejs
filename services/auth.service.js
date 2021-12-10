const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const objectID = require('mongoose').Types.ObjectId;
const refreshTokenModel = require('../models/refreshToken.model');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports = {
    authenticate,
    refreshToken,
    revokeToken,
    getRefreshTokens
};

const whichMethod = pseudo => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(pseudo).toLowerCase());
}

async function authenticate({username, password, ipAddress}) {
    let user;
    if (whichMethod(username)) {
        user = await userModel.findOne({email: username}).exec();
    } else {
        user = await userModel.findOne({username: username}).exec();
    }

    if (!user)
        throw 'Username or Email is incorrect';

    const isMatched = await bcrypt.compare(password, user.password);

    if (false === isMatched)
        throw 'Password is incorrect. Retry...';
    // authentication successful so generate jwt and refresh tokens
    const token = generateJwtToken(user);
    const refreshToken = generateRefreshToken(user, ipAddress);

    // save refresh token
    await refreshToken.save();
    user.adminUrl = 'admin_' + crypto.randomBytes(10).toString('base64url');
    await user.save();

    // return basic details and tokens
    const refresh_token = refreshToken.token
    return {
        ...basicDetails(user),
        accessToken: token,
        refresh_token
    }
}

async function refreshToken({refreshToken, ipAddress}) {
    const RefreshToken = await getRefreshToken(refreshToken);

    if (!(typeof RefreshToken === 'object') )
       throw 'Refresh token is not in database.';

    if (!RefreshToken)
        throw 'Unauthorized, the user does not seem to be known.';

    // replace old refresh token with a new one and save
    const newRefreshToken = generateRefreshToken(RefreshToken, ipAddress);

    RefreshToken.revoked = Date.now();
    RefreshToken.revokedByIp = ipAddress;
    RefreshToken.replacedByToken = newRefreshToken.token;
    await RefreshToken.save();
    await newRefreshToken.save();

    // generate new jwt
    const user = userModel.findById({ _id: newRefreshToken.user })
    const accessToken = generateJwtToken(user);

    const refresh_token =  newRefreshToken.token;
    return {
        accessToken,
        refresh_token
    }
}

async function revokeToken({token, ipAddress}) {
    const refreshToken = await getRefreshToken(token)
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    await refreshToken.save();
}

async function getRefreshTokens(userId) {
    // check that user exists
    const user = await getUser(userId);

    if (!user.roles.includes('ROLE_ADMIN'))
        throw 'Sorry you do not have access to this resources.';
    // return refresh tokens for user
    return refreshTokenModel.find();
}

const getUser = async id => {
    if (!objectID.isValid(id))
        throw 'The given identifier is not known. Authentication is required.';

    const user = await userModel.findById({_id: id});
    if (!user)
        throw 'User not found';
    return user;
}

async function getRefreshToken(token) {
    const refreshToken = await refreshTokenModel.findOne({ token }).populate('user');
    if (refreshToken === null || !refreshToken.isActive)
        return 'Token is invalid'
    return refreshToken;
}

const generateJwtToken = user => {
    return jwt.sign(
        {sub: user._id, id: user._id}, 
        process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: 3600 });
}

const generateRefreshToken = (user, ipAddress) => {
    // create a refresh token that expires in 7 days
    if (!user)
        return null;
    return new refreshTokenModel({
        user: user._id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdByIp: ipAddress
    });
}

const randomTokenString = () => {
    return crypto.randomBytes(40).toString('hex');
}

const basicDetails = (user) => {
    return {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        roles: user.roles,
        adminUrl: user.adminUrl,
        enabled: user.enabled
    };
}

