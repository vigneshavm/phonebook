/**
 * Created by vignesh on 7/31/19.
 */

module.exports = (app) => {
    const actionInstance = require('../actions/action.js');
    const auth = require('./../middlewares/auth.js');

    app.post('/registerUser', actionInstance.registerUser);

    app.post('/login', actionInstance.loginUser);

    app.post('/createContact',auth.isAuthorized, actionInstance.createContact);

    app.post('/updateContact',auth.isAuthorized, actionInstance.updateContact);




}