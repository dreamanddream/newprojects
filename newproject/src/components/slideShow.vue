<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[nowIndex].href">
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].src">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].src">
        </transition>
      </a>
    </div>
    <h2>{{ slides[nowIndex].title }}</h2>
    <ul class="slide-pages">
      <li @click="goto(prevIndex)">&lt;</li>
      <!--渲染页码-->
      <li v-for="(item, index) in slides" @click="goto(index)">
        <!--给a标签添加上On类，index ==== nowIndex为true时给a添加上on类-->
        <a :class="{on: index === nowIndex}">{{ index + 1 }}</a>
      </li>
      <!-- <li>
        <a href="">1</a>
        <a href="">2</a>
        <a href="">3</a>
      </li> -->
      <li @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>
<script>
  export default {
    // 在子组件中不能直接使用父组件传递的slides，而是要使用props进行声明
    props: {
      slides: {
        // 设置类型，接收数组
        type: Array,
        // 数据初始值为空
        default: []
      },
      // 设置定时器的inv值
      inv: {
        type: Number,
        default: 1000
      }
    },
    data () {
      return {
      // 设置index初始值为0，各个图片也是通过index
        nowIndex: 0,
        isShow: true
      }
    },
    // 检查数据是否拿到
    // mounted () {
    //   console.log(this.slides)
    // },
    // 使用计算属性，实现向左向右跳转
    computed: {
      prevIndex () {
        if (this.nowIndex === 0) {
          return this.slides.length - 1
        } else {
          return this.nowIndex - 1
        }
      },
      nextIndex () {
        if (this.nowIndex === this.slides.length - 1) {
          return 0
        } else {
          return this.nowIndex + 1
        }
      }
    },
    // 跳转,更新index值,程序怎么执行的？？？？？？？isShow的作用
    methods: {
      goto (index) {
        this.isShow = false
        setTimeout(() => {
          this.isShow = true
          this.nowIndex = index
        }, 10)
      },
      // 添加定时器,同时在通过父组件传递，在props中设置inv值
      runInv () {
        this.invId = setInterval(() => {
          this.goto(this.nextIndex)
        }, this.inv)
      },
      clearInv () {
        clearInterval(this.invId)
      }
    },
    // 调用定时器
    mounted () {
      this.runInv()
    }
  }
</script>
<style scoped>
.slide-trans-enter-active {
  transition: all .5s;
}
.slide-trans-enter {
  transform: translateX(900px);
}
.slide-trans-old-leave-active {
  transition: all .5s;
  transform: translateX(-900px);
}
.slide-show {
  position: relative;
  margin: 15px 15px 15px 0;
  width: 900px;
  height: 500px;
  overflow: hidden;
}
.slide-show h2 {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  background: #000;
  opacity: .5;
  bottom: 0;
  height: 30px;
  text-align: left;
  padding-left: 15px;
}
.slide-img {
  width: 100%;
}
.slide-img img {
  width: 100%;
  position: absolute;
  top: 0;
}
.slide-pages {
  position: absolute;
  bottom: 10px;
  right: 15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #fff;
}
.slide-pages li .on {
  text-decoration: underline;
}
</style>
