<template>
    <div class="chooser-component">
        <ul class="chooser-list">
          <li v-for="(item, index) in selections" @click="chosenSelection(index)" :class="{active:index===nowIndex}">{{item.label}}</li>
        </ul>
      </div>
</template>

<script>
export default {
  props: {
    selections: {
      type: Array,
      default: [{
        label: 'test',
        value: 0
      }]
    }
  },
  data () {
    return {
      nowIndex: 0
    }
  },
  methods: {
    chosenSelection (index) {
      // 当点击的时候打印出index的值
      // console.log(index)
      this.nowIndex = index
      // 第一次的写法
      // this.$emit('on-change', this.selections[index])
      // 在analysis.vue中定义versionList是对象，所以这里要返回一个对象
      this.$emit('on-change', this.selections[this.nowIndex])
    }
  }
}
</script>

<style scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}
.chooser-list li{
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>
