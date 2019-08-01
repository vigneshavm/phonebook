/**
 * Created by vignesh on 7/31/19.
 */

const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const shortid = require('shortid');
const moment = require('moment')
console.log()

const Service = require('../services/service.js');
const Util = require('../utils/util.js');
const Auth = require('../utils/token.js');

exports.registerUser = async function (req, res) {

    var errorObject = {
        status: 400
    };

    var requestObject = req.body;


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



        var hashPassword = await Util.hash(requestObject.password,10)

        const secretToken = randomstring.generate(6);
        var insertObject = {
            userId: shortid.generate(),
            mailId : requestObject.mailId,
            firstName : requestObject.firstName,
            lastName : requestObject.lastName,
            password :hashPassword,
            secretToken: secretToken

        }
        var users = await Service.insertData(insertObject, tableName);
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

            var hashPassword  = await bcrypt.compare(requestObject.password, users[0].password)

            var generateToken   = await Auth.generateToken(users[0]);

            console.log("generateToken", generateToken);

var tokenObject ={
            userId: users[0].userId,
                authToken: generateToken.token,
                tokenSecret: generateToken.tokenSecret,
                tokenGenerationTime: moment().format()

}

            var insertToken   = await Service.insertData(tokenObject,'tokenAuth')

            if(hashPassword)
                return res.status(200).json({status: 200, data: {usersDetails :users[0],authToken : generateToken.token}, message: "User Login Succesfully "});
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

    var requestObject = req.body ;
    var sessionUser = req.user ? req.user : null;


    console.log("requestObject",requestObject)


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


        var userNameObject ={
            firstName : requestObject.firstName,
            lastName : requestObject.lastName
        };
        var userNameValidation = await Service.findData(userNameObject, tableName);
        if(userNameValidation.length)
            return res.status(200).json({status: 200,  message: "User Name Already Exist"});


        var insertObject ={
            loggedInUser  : sessionUser.userId,
            ID : shortid.generate(),
            firstName : requestObject.firstName,
            lastName : requestObject.lastName,
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

    var requestObject = req.body ;

    console.log("requestObject", requestObject);
    var sessionUser = req.user ? req.user : null;



    var inputObjectValidation = await Util.checkObjectEmptyOrNot(requestObject);
    if (inputObjectValidation)
    {
        errorObject['message'] = "User Registration Object should not be Empty";
        return res.status(400).json(errorObject);
    }

    var contactID = await Util.checkStringEmptyOrNot(requestObject.ID);
    if (contactID){
        errorObject['message'] = "ID Should not be Empty";
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

        var validationUser ={
            ID : requestObject.ID,
            loggedInUser : sessionUser.userId
        };

        var validationUserObject = await Service.findData(validationUser, tableName);
        if(validationUserObject.length)
        {

            var updateUserObject = { };
            requestObject.firstName ? updateUserObject['firstName'] = requestObject.firstName :''
            requestObject.lastName ? updateUserObject['lastName'] = requestObject.lastName :''
            requestObject.phoneNumber ? updateUserObject['phoneNumber'] = requestObject.phoneNumber :''


            var updateUser = await Service.updateData(validationUser,updateUserObject, tableName);
            return res.status(200).json({status: 200,  message: "User updated successfully"});
        }else{
            return res.status(200).json({status: 200,  message: "No user Available"});

        }


         } catch (e) {
        errorObject['message'] = e.message;
        return res.status(400).json(errorObject);
    }
}


