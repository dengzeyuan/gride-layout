import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: resolve => require(['../pages/main/index.vue'], resolve),
        },
        {
          path: '/commandrag',
          name: 'commandrag',
          component: resolve => require(['../pages/commandrag/commandrag.vue'], resolve),
        },
        {
          path: '/commanabsolute',
          name: 'commanabsolute',
          component: resolve => require(['../pages/commanabsolute/commanabsolute.vue'], resolve),
        },
        {
          path: '/vuedragzone',
          name: 'vuedragzone',
          component: resolve => require(['../pages/vuedragzone/vuedragzone.vue'], resolve),
        },
        {
          path: '/dndgrid',
          name: 'dndgrid',
          component: resolve => require(['../pages/dndgrid/dndgrid.vue'], resolve),
        },
       
      ]
    }
  ]
})