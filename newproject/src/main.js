// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入自己安装的路由 vue-router库
import VRouter from 'vue-router'
// 引入vuex
import Vuex from 'vuex'
// 引入自己创建的apple组件
import Apple from './components/apple'
import Banana from './components/banana'
import RedApple from './components/RedApple'

// 使用vue.use注册使用路由vrouter
Vue.use(VRouter)
// 使用use方法注册vuex
Vue.use(Vuex)
// 引入后要实例化路由,实例化后插入到下面vue实例中
let router = new VRouter({
  // 支持前后切换
  mode: 'history',
  // 设置映射关系
  routes: [
    // 重定向在这里这是访问首页时直接跳转到子页面
    {
      path: '/',
      redirect: '/apple'
    },
    {
      // 在path中设置参数，即网址中看到的？后面跟的参数,以：开头
      // 设置参数后需要在组建内部获取参数
      path: '/apple/:color',
      component: Apple,
      children: [
        {
          // path 在网址中显示的路径名
          path: 'red',
          // 渲染到父组件下，上面引入了redapple文件同时赋值给变量ReaApple
          component: RedApple
        }
      ]
    }, {
      path: '/banana',
      component: Banana,
      // 命名视图 在router-link中可以直接使用name，不使用path
      name: 'applePalge'
    }
  ]
})
// 引入后实例化vuex

Vue.config.productionTip = false
// 编程式导航使用router.push.如果
// router.beforeEach(router.push)
// router.push('apple')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 插入路由
  router,
  template: '<App/>',
  components: { App }
})
