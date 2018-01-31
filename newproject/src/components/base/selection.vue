<template>
  <div class="selection-component">
    <!-- 点击调用toggleDrop方法，将isDrop设置为true，从而让选择列表显示出来 -->
      <div class="selection-show" @click="toggleDrop">
        <!-- 在span中显示初始nowIndex为0时的label信息·。 -->
        <span>{{ selections[nowIndex].label }}</span>
        <div class="arrow"></div>
      </div>
      <!-- 最开始设置isDrop为true，所以selection-list是隐藏的-->
      <div class="selection-list" v-if="isDrop">
        <ul>
          <li v-for="(item, index) in selections" @click="chooseSelection(index)">{{ item.label }}</li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  // 父组件传递给子组件
  props: {
    selections: {
      type: Array,
      // 数组默认样式
      default: [{
        label: 'test',
        value: 0
      }]
    }
  },
  data () {
    return {
      isDrop: false,
      nowIndex: 0
    }
  },
  methods: {
    chooseSelection (index) {
      this.nowIndex = index
      this.isDrop = false
      // 使用emit触发事件将子组件状态传递给父组件，简单的理解就是当点击购买可以将selection传出去，知道目前选中的是哪个，同时在
      // 组件有个on-change监听
      // this.$emit('on-change', this.nowIndex) 这是第一次的写法
      // 传值给后台时使用下面的方式,以对象的形式返回，因为前面定义的buyTypes是对象
      this.$emit('on-change', this.selections[this.nowIndex])
    },
    toggleDrop () {
      this.isDrop = !this.isDrop
    }
  }
}
</script>

<style scoped>
.selection-component {
  position: relative;
  display: inline-block;
}
.selection-show {
  border: 1px solid #e3e3e3;
  padding: 0 20px 0 10px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  border-radius: 3px;
  background: #fff;
}
.selection-show .arrow {
  display: inline-block;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #e3e3;
  width: 0;
  height: 0;
  margin-top: -1px;
  margin-left: 6px;
  margin-right: -14px;
  vertical-align: middle;
}
.selection-list {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 25px;
  width: 100%;
  background: #fff;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  z-index: 5;
}
.selection-list li {
  padding: 5px 15px 5px 10px;
  border-left: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3;
  cursor: pointer;
  background: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

}
.selection-list li:hover {
  background: #e3e3e3;
}
</style>
