/**
 * Created by vignesh on 7/31/19.
 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    next();
});

const conf = require('./config/config.js');

require('./routes/route.js')(app);


var hostPort=Number(conf.web.port);

// listen for requests
app.listen(hostPort, () => {
    console.log("Server is listening on port:"+hostPort);
});