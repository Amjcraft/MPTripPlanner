var ObjectID = require('mongodb').ObjectID;
const MP = require('./mountain-project');

module.exports = function (app, db) {

    app.post('/test', (req, res) => {
        const test = { text: req.body.body};
        db.collection('test').insert(test, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.post('/route', (req, res) => {
        if (req.signedCookies.user && req.signedCookies.key) {
            const route = { text: req.body.body };
            if(route.tripId) {
                db.collection('routes').insert(route, (err, result) => {
                    if (err) {
                        conosle.log(err);
                        res.send({ 'error': 'An error has occurred Saving Route' });
                    } else {
                        res.send(result.ops[0]);
                    }
                });
            }
        }
    });


    app.get('/route/:id', (req, res) => {
        if (req.signedCookies.user && req.signedCookies.key) {
            const id = req.params.id;
            const details = { '_id': new ObjectID(id) };
            db.collection('routes').findOne(details, (err, item) => {
                if (err) {
                    conosle.log(err);
                    res.send({ 'error': 'An error has occurred Getting Route' });
                } else {
                    res.send(item);
                }
            });
        }
    });

    app.post('trip/create', (req, res) => {
        if (req.signedCookies.user && req.signedCookies.key) {
            const trip = { text: req.body.body };
                if (trip.name) {
                    trip.members = [req.signedCookies.user] ;

                db.collection('trips').insert(trip, (err, result) => {
                    if (err) {
                        conosle.log(err);
                        res.send({ 'error': 'An error has occurred Saving User' });
                    } else {
                        res.send(result.ops[0]);
                    }
                });
            }
        }
    });

    app.get('trip/:id', (req, res) => {
        if (req.signedCookies.user && req.signedCookies.key) {
            const tripId = req.params.id;

            if (tripId) {
                db.collection('trips').findOne({ '_id': tripId }, (err, item) => {
                    if (err) {
                        conosle.log(err);
                        res.send({ 'error': 'An error has occurred Getting Route' });
                    } else {
                        res.send(item);
                    }
                });
            }
        }
    });

    app.get('trip/:id/routes', (req, res) => {
        if (req.signedCookies.user && req.signedCookies.key) {
            const tripId = req.params.id;

            if (tripId) {
                db.collection('routes').find({ 'tripId': tripId }, (err, item) => {
                    if (err) {
                        conosle.log(err);
                        res.send({ 'error': 'An error has occurred Getting Route' });
                    } else {
                        res.send(item);
                    }
                });
            }
        }
    });

    app.post('user/create', (req, res) => {
        const user = { text: req.body.body };
        MP.getUser(user.email, user.key, function (error, response, body){
            if(error){
                res.send({ 'error': 'Mountain Project user Not found' });
            }
            console.log('Save User');
            console.log(user);
            db.collection('users').insert(user, (err, result) => {
                if (err) {
                    conosle.log(err);
                    res.send({ 'error': 'An error has occurred Saving User' });
                } else {
                    res.send(result.ops[0]);
                }
            });
        })  
    });
    
    app.post('user/get', (req, res) => {
        const user = { text: req.body.body };

        const details = { 'email': user.email, 'key': user.key };
        db.collection('users').findOne(details, (err, data) => {
            if (err) {
                conosle.log(err);
                res.send({ 'error': 'An error has occurred Getting User' });
            } else {
                res.send(data);
            }
        });
    });

    app.post('user/getMPToDos', (req, res) => {
        if (req.signedCookies.user && req.signedCookies.key) {

            MP.getToDos(user.email, user.key, function (error, response, body) {
                if (error) {
                    res.send({ 'error': 'Mountain Project user To Dos Not found' });
                }

                res.send(response);
            })
        }
    });

    app.post('user/getMPToDoRoutes', (req, res) => {
        if (req.signedCookies.user && req.signedCookies.key) {

            MP.getToDos(user.email, user.key, function (error, response, body) {
                if (error) {
                    res.send({ 'error': 'Mountain Project user To Dos Not found' });
                }

                MP.getRoutes(response.toDos, user.key, function (error, response, body) {
                    if (error) {
                        res.send({ 'error': 'Mountain Project user To Dos + Routes Not found' });
                    }

                    res.send(response);
                })
            })
        }
    });
          
};