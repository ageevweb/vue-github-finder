// default
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// pages
import Home from "@/pages/Home"
import NotFound from "@/pages/404"

// routering
export default new Router({
  mode: 'history',
  
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
