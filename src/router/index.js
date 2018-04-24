import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Board from '@/components/Board'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Board',
      component: Board
    },
    {
      path: '/board',
      name: 'Board',
      component: Board
    }
  ]
})
