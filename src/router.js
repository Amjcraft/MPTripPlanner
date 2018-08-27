import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import API from './api.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        console.log(API);
        //Call to get User Via cookies
        function getCookie(name) {
          var value = "; " + document.cookie;
          var parts = value.split("; " + name + "=");
          if (parts.length == 2) return parts.pop().split(";").shift();
          return false;
        }
        const userCookie = getCookie('user');
        if (userCookie) {
          console.log(userCookie);
          next();
          return;
        }
        next({ path: '/login' })
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
