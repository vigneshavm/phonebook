/**
 * Created by vignesh on 7/31/19.
 */
const Service = require('../services/service.js');
const Util = require('../utils/util.js');

exports.registerUser = async function (req, res) {

    var errorObject = {
        status: 400
    };

    var insertData = req.body ? req.body : null;


    var inputObjectValidation = await Util.checkObjectEmptyOrNot(insertData);
    if (inputObjectValidation)
        {
            errorObject['message'] = "User Registration Object should not be Empty";
            return res.status(400).json(errorObject);
        }

    var emailValidation = await Util.validationEmailID(insertData.emailID);
    if (!emailValidation){
        errorObject['message'] = "Please Enter proper mailID";
        return res.status(400).json(errorObject);
    }

    var passwordValidationString = await Util.checkStringEmptyOrNot(insertData.password);
    if (passwordValidationString) {
        errorObject['message'] = "Password Should not be empty";
        return res.status(400).json(errorObject);
    }

    var passwordValidationSyntax = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    var passwordValidationLength = passwordValidationSyntax.test(insertData.password);
    if (!passwordValidationLength) {
        errorObject['message'] = "Password at least one number, one lowercase and one uppercase letter ,at least six characters";
        return res.status(400).json(errorObject);
    }

    const tableName = 'user';

    try {
        var users = await Service.insertData(insertData, tableName);
        return res.status(200).json({status: 200, data: users, message: "User Succesfully Registered"});
    } catch (e) {
        errorObject['message'] = e.message;
        return res.status(400).json(errorObject);
    }
}