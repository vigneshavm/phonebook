/**
 * Created by vignesh on 7/31/19.
 */


exports.checkObjectEmptyOrNot = async function (insertData) {

    try {
        var users = await Object.entries(insertData).length === 0 && insertData.constructor === Object
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error on Given data')
    }
}

exports.checkStringEmptyOrNot = async function (insertData) {

    try {
        var users = await (insertData == null ||
            insertData == undefined ||
            insertData.length == 0)
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error on Given data')
    }
}


exports.validationEmailID =  function (insertData) {


        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(insertData)

};
