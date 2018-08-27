var ObjectID = require('mongodb').ObjectID;

module.exports = {

    getUser: function (db, q, callback) {
        console.log('Get User');
        console.log(q);
        return db.collection('users').findOne(q, function (err, data){ callback(err, data) });
    },

    insertUser: function (db, q, callback) {
        return db.collection('users').insert(q, function (err, data) { callback(err, data) });
    }

}