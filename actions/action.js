/**
 * Created by vignesh on 7/31/19.
 */
const Service = require('../services/service.js');
const Util = require('../utils/util.js');

exports.registerUser = async function (req, res) {

    var errorObject = {
        status: 400
    };

    var requestObject = req.body ? req.body : null;


    var inputObjectValidation = await Util.checkObjectEmptyOrNot(requestObject);
    if (inputObjectValidation)
        {
            errorObject['message'] = "User Registration Object should not be Empty";
            return res.status(400).json(errorObject);
        }





    var mailValidation = await Util.validationMailID(requestObject.mailId);
    if (!mailValidation){
        errorObject['message'] = "Please Enter proper mailID";
        return res.status(400).json(errorObject);
    }

    var firstNameValidationEmpty = await Util.checkStringEmptyOrNot(requestObject.firstName);
    if (firstNameValidationEmpty){
        errorObject['message'] = "First Name Should not be Empty";
        return res.status(400).json(errorObject);
    }

    var firstNameValidationString = await Util.validationStringOrNumber(requestObject.firstName);
    if (!firstNameValidationString){
        errorObject['message'] = "First Name Should not be Number";
        return res.status(400).json(errorObject);
    }

    var lastNameValidationEmpty = await Util.checkStringEmptyOrNot(requestObject.lastName);
    if (lastNameValidationEmpty){
        errorObject['message'] = "Last Name Should not be Empty";
        return res.status(400).json(errorObject);
    }


    var lastNameValidationString  = await Util.validationStringOrNumber(requestObject.lastName);
    if (!lastNameValidationString){
        errorObject['message'] = "Last Name Should not be Number";
        return res.status(400).json(errorObject);
    }


    var passwordValidationString = await Util.checkStringEmptyOrNot(requestObject.password);
    if (passwordValidationString) {
        errorObject['message'] = "Password Should not be empty";
        return res.status(400).json(errorObject);
    }




    var passwordValidationSyntax = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    var passwordValidationLength = passwordValidationSyntax.test(requestObject.password);
    if (!passwordValidationLength) {
        errorObject['message'] = "Password at least one number, one lowercase and one uppercase letter ,at least six characters";
        return res.status(400).json(errorObject);
    }

    const tableName = 'user';

    try {
        
        var validationMailIdAlreadyExistObject ={
            mailId : requestObject.mailId
        };
        
        var responseObjectData = await Service.findData(validationMailIdAlreadyExistObject, tableName);
        if(responseObjectData.length)
            return res.status(200).json({status: 200,  message: "MailID Already Registered"});
            
        var users = await Service.insertData(requestObject, tableName);
        return res.status(200).json({status: 200, data: users, message: "User Succesfully Registered"});
    } catch (e) {
        errorObject['message'] = e.message;
        return res.status(400).json(errorObject);
    }
}

exports.loginUser = async function (req, res) {

    var errorObject = {
        status: 400
    };

    var requestObject = req.body ? req.body : null;


    var inputObjectValidation = await Util.checkObjectEmptyOrNot(requestObject);
    if (inputObjectValidation)
    {
        errorObject['message'] = "User Login Object should not be Empty";
        return res.status(400).json(errorObject);
    }

    var mailValidation = await Util.validationMailID(requestObject.mailId);
    if (!mailValidation){
        errorObject['message'] = "Please Enter proper mailID";
        return res.status(400).json(errorObject);
    }

    var firstNameValidationEmpty = await Util.checkStringEmptyOrNot(requestObject.password);
    if (firstNameValidationEmpty){
        errorObject['message'] = "Password Should not be Empty";
        return res.status(400).json(errorObject);
    }

    
    var passwordValidationSyntax = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    var passwordValidationLength = passwordValidationSyntax.test(requestObject.password);
    if (!passwordValidationLength) {
        errorObject['message'] = "Password at least one number, one lowercase and one uppercase letter ,at least six characters";
        return res.status(400).json(errorObject);
    }

    const tableName = 'user';

    try {

        var findUser = {
            mailId :requestObject.mailId
        };
        var users = await Service.findData(findUser, tableName);
        if(users.length){
            findUser['password'] = requestObject.password
            var usersVerification = await Service.findData(requestObject, tableName);
            if(usersVerification.length)
                return res.status(200).json({status: 200, data: users, message: "User Login Succesfully "});
            else
                return res.status(200).json({status: 200, message: "MailID and Password MisMatch"});
        }
        else
            return res.status(200).json({status: 200,  message: "MailID not registered"});


    } catch (e) {
        errorObject['message'] = e.message;
        return res.status(400).json(errorObject);
    }
}

exports.createContact = async function (req, res) {

    var errorObject = {
        status: 400
    };

    var requestObject = req.body ? req.body : null;


    var inputObjectValidation = await Util.checkObjectEmptyOrNot(requestObject);
    if (inputObjectValidation)
    {
        errorObject['message'] = "User Registration Object should not be Empty";
        return res.status(400).json(errorObject);
    }


    var firstNameValidationEmpty = await Util.checkStringEmptyOrNot(requestObject.firstName);
    if (firstNameValidationEmpty){
        errorObject['message'] = "First Name Should not be Empty";
        return res.status(400).json(errorObject);
    }

    var firstNameValidationString = await Util.validationStringOrNumber(requestObject.firstName);
    if (!firstNameValidationString){
        errorObject['message'] = "First Name Should not be Number";
        return res.status(400).json(errorObject);
    }

    var lastNameValidationEmpty = await Util.checkStringEmptyOrNot(requestObject.lastName);
    if (lastNameValidationEmpty){
        errorObject['message'] = "Last Name Should not be Empty";
        return res.status(400).json(errorObject);
    }


    var lastNameValidationString  = await Util.validationStringOrNumber(requestObject.lastName);
    if (!lastNameValidationString){
        errorObject['message'] = "Last Name Should not be Number";
        return res.status(400).json(errorObject);
    }


    var phoneNumberValidationString = await Util.checkStringEmptyOrNot(requestObject.phoneNumber);
    if (phoneNumberValidationString) {
        errorObject['message'] = "phoneNumber Should not be empty";
        return res.status(400).json(errorObject);
    }

    var phoneNumberValidationLength= await Util.validationPhoneNuber(requestObject.phoneNumber);
    if (!phoneNumberValidationLength) {
        errorObject['message'] = "Invalid PhoneNumber";
        return res.status(400).json(errorObject);
    }

    const tableName = 'contacts';

    try {

        var validationPhoneNumberAlreadyExistObject ={
            phoneNumber : requestObject.phoneNumber
        };

        var responseObjectData = await Service.findData(validationPhoneNumberAlreadyExistObject, tableName);
        if(responseObjectData.length)
            return res.status(200).json({status: 200,  message: "phoneNumber Already In contacts List"});


        var insertObject ={
            loggedInUser  : "",
            contactName : requestObject.firstName + " " + requestObject.lastName,
            phoneNumber : requestObject.phoneNumber
        };

        var users = await Service.insertData(insertObject, tableName);
        return res.status(200).json({status: 200, data: users, message: "User Succesfully Registered"});
    } catch (e) {
        errorObject['message'] = e.message;
        return res.status(400).json(errorObject);
    }
}


exports.updateContact = async function (req, res) {

    var errorObject = {
        status: 400
    };

    var requestObject = req.body ? req.body : null;


    var inputObjectValidation = await Util.checkObjectEmptyOrNot(requestObject);
    if (inputObjectValidation)
    {
        errorObject['message'] = "User Registration Object should not be Empty";
        return res.status(400).json(errorObject);
    }


    var firstNameValidationEmpty = await Util.checkStringEmptyOrNot(requestObject.firstName);
    if (firstNameValidationEmpty){
        errorObject['message'] = "First Name Should not be Empty";
        return res.status(400).json(errorObject);
    }

    var firstNameValidationString = await Util.validationStringOrNumber(requestObject.firstName);
    if (!firstNameValidationString){
        errorObject['message'] = "First Name Should not be Number";
        return res.status(400).json(errorObject);
    }

    var lastNameValidationEmpty = await Util.checkStringEmptyOrNot(requestObject.lastName);
    if (lastNameValidationEmpty){
        errorObject['message'] = "Last Name Should not be Empty";
        return res.status(400).json(errorObject);
    }


    var lastNameValidationString  = await Util.validationStringOrNumber(requestObject.lastName);
    if (!lastNameValidationString){
        errorObject['message'] = "Last Name Should not be Number";
        return res.status(400).json(errorObject);
    }


    var phoneNumberValidationString = await Util.checkStringEmptyOrNot(requestObject.phoneNumber);
    if (phoneNumberValidationString) {
        errorObject['message'] = "phoneNumber Should not be empty";
        return res.status(400).json(errorObject);
    }

    var phoneNumberValidationLength= await Util.validationPhoneNuber(requestObject.phoneNumber);
    if (!phoneNumberValidationLength) {
        errorObject['message'] = "Invalid PhoneNumber";
        return res.status(400).json(errorObject);
    }

    const tableName = 'contacts';

    try {

        var validationPhoneNumberAlreadyExistObject ={
            phoneNumber : requestObject.phoneNumber
        };

        var responseObjectData = await Service.findData(validationPhoneNumberAlreadyExistObject, tableName);
        if(responseObjectData.length)
            return res.status(200).json({status: 200,  message: "phoneNumber Already In contacts List"});


        var insertObject ={
            loggedInUser  : "",
            contactName : requestObject.firstName + " " + requestObject.lastName,
            phoneNumber : requestObject.phoneNumber
        };

        var users = await Service.insertData(insertObject, tableName);
        return res.status(200).json({status: 200, data: users, message: "Contact Save Successfully"});
    } catch (e) {
        errorObject['message'] = e.message;
        return res.status(400).json(errorObject);
    }
}
