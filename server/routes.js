
const MP = require('./mountain-project');
const mongoDB = require('./mongo');

module.exports = function (app, db) {

    // app.use(function (req, res, next) { 
    //     res.header("Access-Control-Allow-Origin", "*");
    //      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     res.header("Access-Control-Allow-Credentials", "*");
    //       next(); });

    // app.all('/', function (req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //     next();
    // });

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    app.post('/test', (req, res) => {
        const test = { text: req.body.body};
        console.log('test Post');
        db.collection('test').insert(test, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.get('/test', (req, res) => {
             res.send({ 'Test': 'Hey look a route' });
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

    app.post('/trip/create', (req, res) => {
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

    app.get('/trip/:id', (req, res) => {
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

    app.get('/trip/:id/routes', (req, res) => {
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

    app.post('/user/create', (req, res) => {
        const user = req.body;
        if(!user.email && !user.key) {
            res.send({ 'error': 'Email and Key Required', 'stack': user });
            return;
        }
        MP.getUser(user.email, user.key, function (error, response, body){
            if(error){
                res.send({ 'error': 'Mountain Project user Not found' });
                return;
            }
            console.log('Save User');
            console.log(response);
            mongoDB.insertUser(db, user, (err, result) => {
                if (err) {
                    conosle.log(err);
                    res.send({ 'error': 'An error has occurred Saving User' });
                } else {
                    res.send(result.ops[0]);
                }
            });
        })  
    });
    
    app.post('/api/user/get', (req, res) => {
        const user = req.body;
        if (!user.email && !user.key) {
            res.send({ 'error': 'Email and Key Required', 'stack': user });
            return;
        }

        const details = { 'email': user.email, 'key': user.key };
        mongoDB.getUser(db, details, (err, data) => {
            if (err) {
                conosle.log(err);
                res.send({ 'error': 'An error has occurred Getting User' });
            } else {
                res.send(data);
            }
        });
    });

    app.post('/api/user/login', (req, res) => {
        const user = req.body;
        if (!user.email && !user.key) {
            res.send({ 'error': 'Email and Key Required', 'stack': user });
            return;
        }

        const details = { 'email': user.email, 'key': user.key };
        
        mongoDB.getUser(db, details, (err, data) => {
            if (err) {
                console.log(err);
                res.send({ 'error': 'An error has occurred Getting User' });
            } else {
                
                if(!data || !data._id) {
                    MP.getUser(user.email, user.key, function (error, response, body) {
                        if (error) {
                            res.send({ 'error': 'Mountain Project user Not found' });
                            return;
                        }
                        console.log('Save User');
                        
                        mongoDB.insertUser(db, user, (err, result) => {
                            if (err) {
                                conosle.log(err);
                                res.send({ 'error': 'An error has occurred Saving User' });
                            } else {
                                console.log('Login - Create User')
                                res.cookie('user', user, { signed: true, maxAge: 900000, domain: '127.0.0.1' })
                                res.send(result.ops[0]);
                            }
                        });
                    })
                    return;
                }
                console.log('Login - Found User')
                res.cookie('user', details, { signed: true, maxAge: 900000, domain: 'localhost' })
                res.send(data);
            }
        });
    });

    app.post('/api/user/getMPToDos', (req, res) => {
        
        MP.getToDos(user.email, user.key, function (error, response, body) {
            if (error) {
                res.send({ 'error': 'Mountain Project user To Dos Not found' });
                return;
            }

            res.send(response);
            return;
        });
    });

    app.get('api/user/getMPToDoRoutes', (req, res) => {
        const user = req.signedCookies['user'];
        console.log('getMP');
        console.log(user);
        if (!user.email || !user.key) {
            return res.send({ 'error': 'Email and Key Required' });;
        }
        MP.getToDos(user.email, user.key, function (error, response, body) {
            if (error) {
                return res.send({ 'error': 'Mountain Project user To Dos Not found' });
            }

            MP.getRoutes(response.toDos, user.key, function (error, response, body) {
                if (error) {
                    return res.send({ 'error': 'Mountain Project user To Dos + Routes Not found' });
                }

                return res.send(response);
            })
        });
    });
    
    app.get('api/user/getMPToDoRoutes', (req, res) => {
        const user = req.signedCookies['user'];
        console.log('getMP');
        console.log(user);
        if (!user.email || !user.key) {
            return res.send({ 'error': 'Email and Key Required' });;
        }
        MP.getToDos(user.email, user.key, function (error, response, body) {
            if (error) {
                return res.send({ 'error': 'Mountain Project user To Dos Not found' });
            }

            MP.getRoutes(response.toDos, user.key, function (error, response, body) {
                if (error) {
                    return res.send({ 'error': 'Mountain Project user To Dos + Routes Not found' });
                }

                return res.send(response);
            })
        });
    }); 
    
    app.post('/api/getRoutesForLatLon', (req, res) => {
        const params = req.body;
        
        console.log(req.signedCookies);
        res.send('Hit');
        return
        //Check for cookie Key
        if (!user.email && !user.key) {
            const key = '';
            res.send({ 'error': 'Email and Key Required', 'stack': user });
            return;
        }

        MP.getRoutesForLatLon(params, key, function (error, response, body) {
            if (error) {
                res.send({ 'error': 'Mountain Project getRoutesForLatLon', 'message': error });
                return;
            }
            console.log('Success Get Routes');
           
            res.send(response);
            return;
        })
      
    });
};