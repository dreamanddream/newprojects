<template>
  <div>
    <h1>{{msg}}</h1>
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
        msg: 'i am a banana',
        price:15
      }
    },
    // 执行加减
     methods: {
      addOne () {
        // 调用store的commit，调用mutations。commit一个动作名
        this.$store.commit('increment',this.price)
      },
      minOne () {
        // 使用动作actions后就不用在使用commit，而是dispatch，然后是actions名字
        this.$store.dispatch('increase',this.price)
      }
    }
  }
</script>
