<template>
    <div class="chooser-component">
        <ul class="chooser-list">
          <li
          v-for="(item, index) in selections"
          @click="toggleSelection(index)"
          :title="item.label"
          :class="{active: checkActive(index)}"
          >{{ item.label }}</li>
        </ul>
    </div>
</template>

<script>
import _ from 'lodash' // 引入lodash，同时将lodash简写为_
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
      nowIndexes: [0]
    }
  },
  methods: {
    toggleSelection (index) {
      if (this.nowIndexes.indexOf(index) === -1) {
        this.nowIndexes.push(index)
      } else {
        // 使用了lodash中的remove方法
        this.nowIndexes = _.remove(this.nowIndexes, (idx) => {
          // 返回idx ！== index ？？？？？？
          return idx !== index
        })
      }
      // 第一次this.$emit('on-change', this.nowIndexes)
      // 关于多选在analysis.vue中定义的是一个数组，所以这里也要改一下，要返回一个对象数组，使用lodash中map方法，通过映射
      // 将每一个index变成了从selections中取得对象，但是要注意箭头函数中的this和其他情况下的区别
      // 同时在组件中使用on-change，并且设置多个on-change共用一个方法
      let nowObjArray = _.map(this.nowIndexes, (idx) => {
        return this.selections[idx]
      })
      // 将nowObjarray传给父组件
      this.$emit('on-change', nowObjArray)
    },
    checkActive (index) {
      return this.nowIndexes.indexOf(index) !== -1
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
