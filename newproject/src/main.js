// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入自己安装的路由 vue-router库
import VueRouter from 'vue-router'
// 引入vue-resource
import VueResource from 'vue-resource'
// import App from './App' // 引入app.vue作为根组件
// 搭建项目引入自己的layout模板
import Layout from './components/layout'
// 设置页面要跳转到的路由地方
import IndexPage from './pages/index'
// 添加新路由
import DetailPage from './pages/detail'
// 添加子路由
import DetailForPage from './pages/detail/forecase'
import DetailAnaPage from './pages/detail/analysis'
import DetailCouPage from './pages/detail/count'
import DetailPubPage from './pages/detail/publish'
// 引入vuex
// import Vuex from 'vuex'
// 引入自己创建的apple组件
// import Apple from './components/apple'
// import Banana from './components/banana'
// import RedApple from './components/RedApple'

// 使用vue.use注册使用路由vrouter
Vue.use(VueRouter)
// 注册vueResource，相当于声明，声明后就可以在各个子文件通过this.$http进行请求
Vue.use(VueResource)
// 实例化
let router = new VueRouter({
  ActiveClass: 'active',
  // 返回上一步使用mode
  mode: 'history',
  // 配置路由
  routes: [
    {
      path: '/',
      // 注意这里是component
      // 配置根页面路由，一旦访问根页面，就跳转到/pages/index页面
      component: IndexPage
    },
    // 添加路由配置
    {
      path: '/detail',
      component: DetailPage,
      // 设置子路由，在detail.vue中使用
      children: [
        {
          path: 'forecast', // 注意这里的路径不能加/，这里路由就表示/detail/forecast
          component: DetailForPage
        },
        {
          path: 'analysis',
          component: DetailAnaPage
        },
        {
          path: 'count',
          component: DetailCouPage
        },
        {
          path: 'publish',
          component: DetailPubPage
        }
      ]
    }
  ]
})
// 使用use方法注册vuex
// Vue.use(Vuex)
// 引入后要实例化路由,实例化后插入到下面vue实例中
// let router = new VRouter({
//   // 支持前后切换.使用html5的history
//   mode: 'history',
//   // 设置映射关系
//   routes: [
//     // 重定向在这里这是访问首页时直接跳转到子页面
//     // {
//      // path: '/',
//     // redirect: '/apple'
//     // },
//     {
//       // 在path中设置参数，即网址中看到的？后面跟的参数,以：开头
//       // 设置参数后需要在组建内部获取参数
//       path: '/apple/:color',
//       component: Apple,
//       children: [
//         {
//           // path 在网址中显示的路径名
//           path: 'red',
//           // 渲染到父组件下，上面引入了redapple文件同时赋值给变量ReaApple
//           component: RedApple
//         }
//       ]
//     }, {
//       path: '/banana',
//       component: Banana,
//       // 命名视图 在router-link中可以直接使用name，不使用path
//       name: 'applePalge'
//     }
//   ]
// })
// 引入后实例化vuex,赋值给store，操作数据中心，同时要将store放到实例化vue中
// let store = new Vuex.Store({
//   state: {
//     totalPrice: 0
//   },
//   // getters: {
//   //   getTotal (state){
//   //   }
//   // },
//   mutations: {
//     // 通过state改变totalPrice
//     increment (state, price) {
//       state.totalPrice += price
//     },
//     decrement (state, price) {
//       state.totalPrice -= price
//     }
//   },
//   actions: {
//     // actions只能调用mutations，不能调用state
//     // increase (context, id) {
//     //   api(id, function (price) {
//     //     context.commit('increment', price)
//     //   })
//     // }
//   }
// })
Vue.config.productionTip = false
// 编程式导航使用router.push.如果
// router.beforeEach(router.push)
// router.push('apple')

/* eslint-disable no-new */
new Vue({
  // 模板是app这样的根组件
  el: '#app',
  // 插入路由
  router,
  // 将store添加到实例化的vue中,全局使用，然后可以在每一个子组件中，通过this.$store.stare去触发方法，调用状态
  // store,
  // template: '<App/>',
  // 修改模板
  template: '<Layout/>', // 这个模板也必须要通过下面注册组件，才能有效，同样名称也只能是和引入的一样Layout from './components/layout
  // components: { App }
  // 重新设置新的组件
  components: { Layout } // 引入的根组件名称,相当于设置网站的公共头部和底部，通过import Layout from './components/layout'引入，这里模板名称要和命名的模板名称一致
})
