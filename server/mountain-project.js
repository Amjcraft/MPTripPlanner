var request = require('request');
var mountainProjectBaseURL = "https://www.mountainproject.com/data/";

module.exports =  {

    getUser: function(email, key, callback) {
        //https://www.mountainproject.com/data/get-user?email=amjcraft@gmail.com&key=200267803

        var url = mountainProjectBaseURL + 'get-user?email=' + email + '&key=' + key;
        request(url , function (error, response, body) {
            if(error) {
                return console.error('Get User Failed:', err); 
            }

            return callback(error, response, body)

            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        });

    },

    getToDos: function (email, key, callback) {
        //https://www.mountainproject.com/data/get-to-dos?email=amjcraft@gmail.com&key=20026780

        var url = mountainProjectBaseURL + 'get-to-dos?email=' + email + '&key=' + key;
        request(url, function (error, response, body) {
            if (error) {
                return console.error('Get User Failed:', err);
            }

            return callback(error, response, body);
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        });

    },

    getRoutes: function (routeIds, key, callback) {
        //https://www.mountainproject.com/data/get-routes?routeIds=105748391,105750454,1057499&key=200267803-23ebba148e606f07a637b8532e845c77
        var url = mountainProjectBaseURL + 'get-routes?routeIds=' + routeIds + '&key=' + key;
        request(url, function (error, response, body) {
            if (error) {
                return console.error('Get User Failed:', err);
            }

            return callback(error, response, body);

            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        });

    },

    getRoutesForLatLon: function(obj, key, callback) {
        //https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=40.03&lon=-105.25&maxDistance=10&minDiff=5.6&maxDiff=5.10&key=200267803-23ebba148e606f07a637b8532e845c77
        var queryString = '';
        for (var key in obj) {
            queryString += key + '=' + obj[key];
        }

        var url = mountainProjectBaseURL + 'get-routes-for-lat-lon? ' + queryString;
        request(url , function (error, response, body) {

            return callback(error, response, body);

            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        });
    }
    
}