const constants = require('./../../constants');
const MP = require('./mountain-project');
const mongoDB = require('./mongo');

module.exports = function (app, db) {
    const BASEROUTE = '/api/mp/'
    let userCookie;
    // app.use(function (req, res, next) { 
    //     res.header("Access-Control-Allow-Origin", "*");
    //      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     res.header("Access-Control-Allow-Credentials", "*");
    //       next(); });

    app.all(BASEROUTE, function (req, res, next) {
        const cookie = req.signedCookies[constants.USER_COOKIE_NAME];

        if (cookie && cookie.key) {
            console.log('Cookie' + user);
            userCookie = cookie;
            next();
        }
        console.log('No Cookie' + req.signedCookies);
        res.send({ 'error': 'No Cookie or key set' }); 
    });


    app.get(BASEROUTE + 'test', (req, res) => {
        res.send({ 'Test': 'Hey look a route' });
    });

    app.get(BASEROUTE + 'route/:id', (req, res) => {
        const routes = req.body.routes;
        
        if (routes) {
            return res.send({ 'error': 'No Routes' });
        }

        MP.getRoutes(routes, userCookie.key, function (error, response, body) {
            if (error) {
                return res.send({ 'error': 'Mountain Project user To Routes Not found' });
            }

            return res.send(response);
        });
    });

    app.get(BASEROUTE + 'getMPToDoRoutes', (req, res) => {
        if (!userCookie.email || !userCookie.key) {
            return res.send({ 'error': 'Email and Key Required' });
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

        MP.getRoutesForLatLon(params, userCookie.key, function (error, response, body) {
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