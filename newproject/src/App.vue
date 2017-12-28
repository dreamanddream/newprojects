<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--渲染数据-->
    {{totalPrice}}
    <!-- <HelloWorld/> -->
   <router-view></router-view>
   <!--在template中使用routerlink属于声明式导航，同时还有编程式导航-->
   <!-- 使用<router-link>添加跳转按钮,在template中使用内置组件,这里使用了绑定 -->
     <router-link :to="{path:'apple'}">to apple</router-link>
     <!--如果不绑定的话to直接作为href使用-->
     <router-link to="/apple">我没有使用bind绑定</router-link>
     <!--也可以在对象中直接传入参数-->
     <router-link :to="{path:'banana',param:{color:'green'}}">to banana</router-link>
     <!--直接访问子页面路由 -->
     <!--使用tag直接指定标签元素，同时如果设置路由时使用了具名，那么在这里可以将path直接改成name-->
     <router-link :to="{path:'apple'}" tag="li">我是li不是a标签</router-link>
    <!--使用过渡动画 keepalive可以配合rouer-view使用-->
    <!--使用组件-->
   <apple></apple>
   <banana></banana>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
// 引入两个组件，使用vuex案例时才引入的
import Apple from './components/apple'
import Banana from './components/banana'
export default {
  name: 'app',
  components:{Apple, Banana},
  computed: {
    totalPrice () {
      // 通过this.$store触发方法，调用状态,类似于this.$router
      return this.$store.state.totalPrice
    }
  }
  // components: {
  //   HelloWorld
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
