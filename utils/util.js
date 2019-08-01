/**
 * Created by vignesh on 7/31/19.
 */

const bcrypt = require('bcryptjs');


exports.checkObjectEmptyOrNot = async function (inputData) {

    try {
        var response = await Object.entries(inputData).length === 0 && inputData.constructor === Object
        return response;
    } catch (e) {
        // Log Errors
        throw Error('Error on Given data')
    }
}

exports.checkStringEmptyOrNot = async function (inputData) {

    try {
        var response = await (inputData == null ||
            inputData == undefined ||
            inputData.length == 0)
        return response;
    } catch (e) {
        // Log Errors
        throw Error('Error on Given data')
    }
}


exports.validationMailID =  async function (inputData) {

    try {
        var response = await (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputData))
        return response;
    } catch (e) {
        // Log Errors
        throw Error('Error on Given data')
    }
    
};


exports.validationStringOrNumber = async function (inputData) {
    try {
        var response = await (/^[a-zA-Z]+$/.test(inputData))
        return response;
    } catch (e) {
        // Log Errors
        throw Error('Error on Given data')
    }
};

exports.validationPhoneNuber = async function (inputData) {
    try {
        var response = await (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(inputData))
        return response;
    } catch (e) {
        // Log Errors
        throw Error('Error on Given data')
    }
};
exports.hash = async function (inputData,count) {
    try {
        var response = await bcrypt.hash(inputData,count)
        return response;
    } catch (e) {
        // Log Errors
        throw Error('Error on Given data')
    }
};

