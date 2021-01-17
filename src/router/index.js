import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 登录页面
const login = () => Promise.resolve(require('@/view/login'))

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
