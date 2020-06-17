import Vue from 'vue';
import App from './App';
import Login from "./components/Login";
import Home from "./components/Home";
import Admin from "./components/Admin";

import VueRouter from 'vue-router';
import {isAdmin, isLoggedIn} from "./utils/AuthService";

Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.directive('scroll', {
    inserted: function(el, binding) {
        let f = function(evt) {
            if (binding.value(evt, el)) {
                window.removeEventListener('scroll', f);
            }
        };
        window.addEventListener('scroll', f);
    },
});


const routes = [
    {
        path: '/',
        name: 'home',
        beforeEnter: guard,
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/admin',
        name: 'admin',
        beforeEnter: adminGuard,
        component: Admin
    },
    {
        path: '*',
        component: Home,
        beforeEnter: guard
    }
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

function guard(to, from, next){
    if(isLoggedIn()){
        next();
    } else {
        next('/login');
    }
}

function adminGuard(to, from, next){
    if(isLoggedIn() && isAdmin()){
        next();
    } else if(isLoggedIn()) {
        next('/');
    } else {
        next('/login');
    }
}

/*router.beforeEach((to, from, next) => {
    //console.log(isLoggedIn());
    if (!isLoggedIn()) {
        next('/');
    } else {
        next();
    }
});*/

// eslint-disable-next-line no-unused-vars
const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
