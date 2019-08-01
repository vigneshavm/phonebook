/**
 * Created by vignesh on 7/31/19.
 */
var mongojs = require('mongojs');

// Configuring the database
const dbConfig = require('../config/config');
const db = mongojs(dbConfig.database.url);

exports.insertData = async function (insertData, table) {

    try {
        var users = await db[table].insert(insertData)
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error on Data insertion')
    }
}


exports.findData = async function (insertData, table) {

     return new Promise((resolve, reject) => {
     var data=db[table].find(insertData,{_id:0}).toArray((err, data) => {
         if(data)
             resolve(data)
         else
             resolve('Error on Data Finding')
     })
     })
}

