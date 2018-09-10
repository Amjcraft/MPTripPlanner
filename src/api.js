import axios from 'axios'

const api = {
    login: function (user) {
        if (!user.email || !user.key) {
            return new error('User info incorrect')
        }

        axios.defaults.headers.post['Content-Type'] = 'application/json';
        //axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.withCredentials = true;
        // axios.defaults.headers.
        const postData = {
            email: user.email,
            key: user.key
        };

        return axios.post('http://localhost:8000/api/user/login', postData)
            .then(function (response) {
                console.log('User Login Yeah!!');
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    },
    getUser: function (user) {
        if (!user.email || !user.key) {
            return new error('User info incorrect')
        }

        axios.post('/api/user/get', {
            email: user.email,
            key: user.key
        }).then(function (response) {
                console.log('User Login Yeah!!');

                if (response.headers.cookies.user) {
                    document.cookie = 'user=' + response.headers.cookies.user;
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    },
    getUserRoutes: function () {
        axios.get('/api/user/getMPToDoRoutes').then(function (response) {
            console.log('User MP Routes!!');
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    },
    getRouteDetails: function (params) {
        const postData = {
            routeIds: params.routeIds
        };

        return axios.post('http://localhost:8000/api/getRoutesForLatLon', postData)
            .then(function (response) {
                console.log('User Login Yeah!!');
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    },
    getSurroundingRoutes: function(params) {
        const postData = {
            lat: params.latLon.lat,
            lon: params.latLon.lon,
            maxDistance: params.distance,
            minDiff: params.minDifficulty,
            maxDiff: params.maxDifficulty
        };

        return axios.post('http://localhost:8000/api/getRoutesForLatLon', postData)
            .then(function (response) {
                console.log('User Login Yeah!!');
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            }); 
    }
};

export default api