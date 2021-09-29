import Vue from 'vue'
import { Button, Input } from 'ant-design-vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Query from '@/components/Query'
Vue.use(Router)
Vue.use(Button)
Vue.use(Input)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/query',
      name: 'query',
      component: Query
    }
  ]
})
