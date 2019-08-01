/**
 * Created by vignesh on 7/31/19.
 */
module.exports = (app) => {
    const actionInstance = require('../actions/action.js');

    app.post('/registerUser', actionInstance.registerUser);

    app.post('/login', actionInstance.loginUser);


}