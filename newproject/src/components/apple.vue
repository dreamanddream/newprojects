<template>
  <div>
    <h1>{{msg}}</h1>
    <!-- getParam 通过点击事件调用-->
    <button @click="getParam">getParam</button>
    <!--同时可以使用大括号直接显示,因为$route.params已经注册过-->
    <p>{{$route.params.color}}</p>
    <!--接受子组件-->
    <router-view></router-view>
     <!--vuex使用案例-->
    <button @click="addOne">add addOne</button>
    <button @click="minOne">min one</button>
  </div>
</template>
<script>
  export default{
    name: 'hello',
    data () {
      return {
        msg: 'i am a apple',
        price:5
      }
    },
    // 设置参数后在组件内部获取参数
    methods: {
      getParam () {
        // 通过this.$route.params 全局对象获取参数
        console.log(this.$route.params)
      },
      addOne () {
        // 调用store的commit，调用mutations
        this.$store.commit('increment',this.price)
      },
      minOne () {
        this.$store.commit('decrement',this.price)
      }
    }
  }
</script>
