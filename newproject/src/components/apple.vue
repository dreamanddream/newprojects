<template>
  <div>
    <h1>{{msg}}</h1>
    <!-- getParam 通过点击事件调用-->
    <button @click="getParam">getParam</button>
    <!--同时可以使用大括号直接显示,因为$route.params已经注册过-->
    <p>{{$route.params.color}}</p>
    <!--接受子组件-->
    <router-view></router-view>
  </div>
</template>
<script>
  export default{
    name: 'hello',
    data () {
      return {
        msg: 'i am a apple'
      }
    },
    // 设置参数后在组件内部获取参数
    methods: {
      getParam () {
        // 通过this.$route.params 全局对象获取参数
        console.log(this.$route.params)
      }
    }
  }
</script>
