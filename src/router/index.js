import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';

import Login from '../views/Auth/Login.vue';
import Register from '../views/Auth/Register.vue';

import Board from '../views/App/Board.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/b/:id',
    component: Board,
  },
  {
    path: '*',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const publicRequired = publicPages.includes(to.path);
  const loggedIn = Vue.$cookies.get('token');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  if (publicRequired && loggedIn) {
    return next('/');
  }

  return next();
});
