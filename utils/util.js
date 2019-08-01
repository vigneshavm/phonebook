/**
 * Created by vignesh on 7/31/19.
 */


exports.checkObjectEmptyOrNot = async function (insertData) {

    try {
        var response = await Object.entries(insertData).length === 0 && insertData.constructor === Object
        return response;
    } catch (e) {
        // Log Errors
        throw Error('Error on Given data')
    }
}

exports.checkStringEmptyOrNot = async function (insertData) {

    try {
        var response = await (insertData == null ||
            insertData == undefined ||
            insertData.length == 0)
        return response;
    } catch (e) {
        // Log Errors
        throw Error('Error on Given data')
    }
}


exports.validationMailID =  async function (insertData) {

    try {
        var response = await (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(insertData))
        return response;
    } catch (e) {
        // Log Errors
        throw Error('Error on Given data')
    }
    
};


exports.validationStringOrNumber = async function (insertData) {
    try {
        var response = await (/^[a-zA-Z]+$/.test(insertData))
        return response;
    } catch (e) {
        // Log Errors
        throw Error('Error on Given data')
    }
};

