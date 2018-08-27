const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
var cors = require('cors');
const dbConfig = require('./config/db');
var cookieParser = require('cookie-parser');


const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:8080' }));
app.use(express.static('public'));
app.use(cookieParser("secret"));

const port = 8000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

MongoClient.connect(dbConfig.url, (err, client) => {

    if (err) return console.log(err);
    var db = client.db(dbConfig.databaseName);
    console.log(db.collection);

    require('./server/routes')(app, db);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });

}); 

//app.use(bodyParser.urlencoded({ extended: true }));