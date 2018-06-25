const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
var cookieParser = require('cookie-parser');


const app = express();
app.use(cookieParser());

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)

    require('./server/routes')(app, database);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
}); 

//app.use(bodyParser.urlencoded({ extended: true }));