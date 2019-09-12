import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Stats')
    },
    {
      path: '/teams',
      component: () => import('../views/Index'),
      children: [
        {
          path: '',
          name: 'teams.home',
          component: () => import('../views/Teams'),
        },
        {
          path: ':id',
          name: 'teams.team',
          component: () => import('../views/Team')
        }
      ]
    },
    {
      path: '/players',
      component: () => import('../views/Index'),
      children: [
        {
          path: '',
          name: 'players.home',
          component: () => import('../views/Players')
        },
        {
          path: ':id',
          name: 'players.player',
          component: () => import('../views/Player')
        }
      ]
    },
    {
      path: '/add-result',
      name: 'addResult',
      component: () => import('../views/AddResult')
    },
    {
      path: '/sortea2',
      name: 'sortea2',
      component: () => import('../views/Sortea2.vue')
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
