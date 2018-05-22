import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'
import homepage from '@/components/homepage.vue'
import todo from '@/components/todo/todo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: homepage,
      children: [{
        path: '/homepage/todo',
        name: 'todo',
        component: todo
      }]
    }
  ]
})
