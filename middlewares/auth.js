/**
 * Created by vignesh on 8/1/19.
 */

const jwt = require('jsonwebtoken');
const Service = require('../services/service.js');




exports.isAuthorized = async function (req, res, next) {


    if (req.params.authToken || req.query.authToken || req.body.authToken || req.header('authToken')) {

        var errorObject = {
            status: 400
        };

        var getToken = await Service.findOneData({authToken: req.header('authToken') || req.params.authToken || req.body.authToken || req.query.authToken},"tokenAuth");
        if (getToken) {

            var verifyToken = await jwt.verify(getToken.authToken,getToken.tokenSecret);
            console.log("verifyToken", verifyToken);
            errorObject['message'] = verifyToken;

            req.user = {userId: verifyToken.data.userId}
            next()
        } else {
            errorObject['message'] = "Invalid Or Expired AuthorizationKey";
            return res.status(400).json(errorObject);
        }
    }

    else {
        logger.error('AuthorizationToken Missing', 'AuthorizationMiddleware', 5)
        let apiResponse = responseLib.generate(true, 'AuthorizationToken Is Missing In Request', 400, null)
        res.send(apiResponse)
    }
}
