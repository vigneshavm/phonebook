/**
 * Created by vignesh on 8/1/19.
 */

const jwt = require('jsonwebtoken');
const Service = require('../services/service.js');




exports.isAuthorized = async function (req, res, next) {

    var errorObject = {
        status: 400
    };
    if (req.params.authToken || req.query.authToken || req.body.authToken || req.header('authToken')) {


        var criteria={
            condition : {authToken: req.header('authToken') || req.params.authToken || req.body.authToken || req.query.authToken},
            sortOrder : {_id:1}
        };

        criteria['limit'] =  0;
        criteria['skip'] = 0;


        var getToken = await Service.findData(criteria,"tokenAuth");
        console.log("getToken", typeof getToken);
        if ( getToken.length) {

            console.log("getToken", getToken);

            var tokenObject = getToken[0];

            var verifyToken = await jwt.verify(tokenObject.authToken,tokenObject.tokenSecret);
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
        errorObject['message'] = 'AuthorizationToken Is Missing In Request';
        return res.status(400).json(errorObject);
    }
}
