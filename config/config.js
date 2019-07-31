/**
 * Created by vignesh on 7/31/19.
 */
module.exports =  {
    web: {
        host: "0.0.0.0",
        port: "3002",
        method: "session",
        views: {},
        static: {}
    },
    database: {
        api: 'mongodb',
        host: '127.0.0.1',
        port: '27107',
        schema: 'phonebook',
        auth: false,
        username: '',
        password: '',
        url: 'localhost:27017/phonebook'
    }
};