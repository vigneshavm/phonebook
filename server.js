/**
 * Created by vignesh on 7/31/19.
 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const conf = require('./config/config.js');


require('./routes/route.js')(app);
var hostPort=Number(conf.web.port);

// listen for requests
app.listen(hostPort, () => {
    console.log("Server is listening on port:"+hostPort);
});