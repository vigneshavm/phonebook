/**
 * Created by root on 8/1/19.
 */

const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const secretKey = "thisissecretkeyforchecking";



exports.generateToken = async function (inputData) {

    try {
        let claims = {
            jwtid: shortid.generate(),
            iat: Date.now(),
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
            sub: 'authToken',
            iss: 'to-do',
            data: inputData
        };
        let tokenDetails = {
            token: jwt.sign(claims, secretKey),
            tokenSecret : secretKey
        };


        return tokenDetails;
    }
    catch (e) {
        // Log Errors
        throw Error('Error on Given data')
    }
}// end generate token


exports.verifyClaim = async function (token,secretKey) {

    // verify a token symmetric
    try {
        var response = await jwt.verify(token, secretKey)
        return response;
    } catch (e) {
        // Log Errors
        throw Error('Error on Given data')
    }

}// end verify claim



exports.verifyClaimWithoutSecret = async function (token) {

    // verify a token symmetric
    try {
        var response = await jwt.verify(token, secretKey);
        return response;
    } catch (e) {
        // Log Errors
        throw Error('Error on Given data')
    }

}// end verify claim Without Secret

