import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 登录页面
const login = () => Promise.resolve(require('@/view/login'))

// 模板页面
const templatePage = () => Promise.resolve(require('@/components/templatePage'))

// 首页
const home = () => Promise.resolve(require('@/view/home'))

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
    },
    {
      path: '/',
      component: templatePage,
      children: [
        {
          path: '/home',
          component: home
        }
      ]
    }
  ]
})
