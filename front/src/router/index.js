import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashbord',
      component: resolve => { require(['components/dashboard'], resolve) }
    },
    {
      path: '/edit',
      name: 'edit',
      component: resolve => { require(['components/edit'], resolve) }
    }
  ]
})
