const userModel = require('../models/user.model');
const {validate} = require('../utils/validators');
const authService = require('../services/auth.service');
const objectID = require('mongoose').Types.ObjectId;

module.exports.signIn = async (req, res, next) => {
    const {username, password} = req.body;
    const ipAddress = req.ip;

    if (!username && !password){
        return res.status(422).send({message: 'Put your login details.'});
    }

   await authService.authenticate({ username, password, ipAddress })
        .then(({ refreshToken, ...user }) => {
            //setTokenCookie(res, refreshToken);
            res.status(200).send(user);
        })
        .catch(e => res.status(401).send(e));
}

module.exports.refreshToken = async (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken)
        return res.status(403).json({ message: "Refresh Token is required." });
    const ipAddress = req.ip;

    authService.refreshToken({refreshToken, ipAddress})
        .then(({ refreshToken, ...user }) => {
            //setTokenCookie(res, refreshToken);
            res.status(200).send(user);
        })
        .catch(e => res.status(403).send({ message: e }));
}

module.exports.me = (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send({ message: "UNKNOWN ID." })

    userModel.findById(
        { _id: req.params.id },
        (error, user) => {
            if (error){
                return res.status(400).send(error);
            }

            return res.status(200).send(user);
        }
    );
};

module.exports.revokeRefreshToken = (req, res, next) => {
    // accept token from request body or cookie
    const token = req.body.token || req.cookies.refreshToken;
    const ipAddress = req.ip;
    if (!token) return res.status(400).send({message: 'Token is required'});

    // users can revoke their own tokens and admins can revoke any tokens
    if (!req.ownsToken || !req.user.roles.includes('ROLE_ADMIN'))
        return res.status(401).send({message: 'Unauthorized'});

    authService.revokeToken({ token, ipAddress })
        .then(() => res.status(200).send({ message: 'Token revoked' }))
        .catch(next);
}

module.exports.getRefreshTokens = (req, res, next) => {
    // users can get their own refresh tokens and admins can get any user's refresh tokens
    if (req.params.id !== req.user.id && !req.user.roles.includes('admin'))
        return res.status(401).send({ message: 'Unauthorized' });

    authService.getRefreshTokens(req.params.id)
        .then(tokens => tokens ? res.status(200).send(tokens) : res.sendStatus(404))
        .catch(e => res.status(401).send({ message: e }));
}

module.exports.signUp = async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

    try{
        const user = await userModel.create({ firstName, lastName, username, email, password });
        return res.status(201).send(user);
    } catch (e) {
        const errors = validate(e);
        return res.status(422).send(errors);
    }
}

module.exports.logOut = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    return res.redirect('/');
}

const setTokenCookie = (res, token) => {
    // create http only cookie with refresh token that expires in 7 days
    const cookieOptions = {
        httpOnly: true,
        domain: 'localhost',
        expires: new Date(Date.now() + 7*24*60*60*1000), 
        secure: false,
        sameSite: 'lax'
    };

    return res.cookie('refreshToken', token, cookieOptions);
}