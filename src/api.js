import axios from 'axios'

export default {
    login: function (user) {
        if (!user.email || !user.key) {
            return new error('User info incorrect')
        }

        axios.post('/api/user/login', {
            email: user.email,
            key: user.key
        })
        .then(function (response) {
            console.log('User Login Yeah!!');
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
            console.log('User MP Routes!!')
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }
};


