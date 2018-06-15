import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import session from '@/components/session'
import scripts from '@/components/scripts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
    	path: '/session',
    	name: 'session',
    	component: session
    },
    {
      path: '/scripts',
      name: 'scripts',
      component: scripts
    }

  ]
})
