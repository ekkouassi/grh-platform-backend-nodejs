const refreshTokenModel = require('../models/refreshToken.model');
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET }  = process.env;

module.exports = authorize;
function authorize(){
    return [
        // authorize based on bearer token
        async (req, res, next) => {
            // get the token stored in the custom header called 'x-auth-token'
           //console.log(req)
            const token = req.get('Authorization').split(' ')[1];
            //send error message if no token is found
            if (!token)
                return res.status(401).send({ message: "Access denied, token missing!" });

            //console.log(token)
            //if the incoming request has a valid token, we extract the payload from the token and attach it to the request object.
            try {
                const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
                req.user = payload;
                //console.log(payload);
                next();
            } catch (error) {
                // token can be expired or invalid. Send appropriate errors in each case:
                if (error.name === "TokenExpiredError") {
                    return res
                        .status(401)
                        .send({ message: "Session timed out,please login again" });
                } else if (error.name === "JsonWebTokenError") {
                    return res
                        .status(401)
                        .send({ message: "Invalid token,please login again!" });
                } else {
                    //catch other unprecedented errors
                    console.error(error);
                    return res.status(400).send({ error });
                }
            }
        }
    ];
}