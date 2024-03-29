/**
 * Created by vignesh on 7/31/19.
 */
const mongojs = require('mongojs');

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


exports.findData = async function (criteria, table) {


    return new Promise((resolve, reject) => {
     var data=db[table].find(criteria.condition,{_id:0}).sort(criteria.sortOrder).skip(criteria.skip).limit(criteria.limit).toArray((err, data) => {
         if(data)
             resolve(data)
         else
             resolve('Error on Data Finding')
     })
     })
}




exports.updateData = async function (condition,updateData, table) {

    try {
        var users = await db[table].update(condition, { $set: updateData }, { upsert: true })
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error on Data insertion')
    }
}