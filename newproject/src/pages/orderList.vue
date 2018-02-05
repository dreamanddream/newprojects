<template>
  <div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <v-selection :selections="products" @on-change="productChange"></v-selection>
      </div>

      <div class="order-list-option">
        开始日期：
         <!-- 通过绑定value属性，获取到用户选择的日期,由于组件本身已经设置过value，所以这里直接通过函数传值即可-->
        <!-- <v-date-picker @on-change="getStartDate" :value="startDate"></v-date-picker> -->
        <v-date-picker @on-change="getStartDate" ></v-date-picker>
      </div>

      <div class="order-list-option">
        结束日期：
        <v-date-picker @on-change="getEndDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        关键词：
        <!-- 这里给v-model添加了修饰符.lazy表示在input中全部输入完，再执行lazy方法 -->
        <input type="text" v-model.lazy="query" class="order-query">
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="head in tableHeads" @click="changeOrderType(head)" :class="{active:head.active}">{{ head.label }}</th>
        </tr>
        <tr v-for="item in tableData" :key="item.period">
          <td v-for="head in tableHeads">{{ item[head.key] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import VSelection from '../components/base/selection' // 直接饮用selection，只需要在当前页面传递数据，由于selection.vue组件中样式使用scoped所以引入后样式不能用，要在当前页面重新写
import VDatePicker from '../components/base/datepicker' // 引入安装后得datepicker
import _ from 'lodash'
export default {
  components: {
    VSelection,
    VDatePicker
  },
  data () {
    return {
      query: '', // 代表在关键词input输入框中输入的词
      productId: 0, // 初始化下拉选择框prodectId为0
      startDate: '',
      endDate: '',
      products: [
        {
          label: '数据统计',
          value: 0
        },
        {
          label: '数据预测',
          value: 1
        },
        {
          label: '流量分析',
          value: 2
        },
        {
          label: '广告发布',
          value: 3
        }
      ],
      tableHeads: [
        {
          label: '订单号',
          key: 'orderId'
        },
        {
          label: '购买产品',
          key: 'product'
        },
        {
          label: '版本类型',
          key: 'version'
        },
        {
          label: '有效时间',
          key: 'period'
        },
        {
          label: '购买日期',
          key: 'date'
        },
        {
          label: '数量',
          key: 'buyNum'
        },
        {
          label: '总价',
          key: 'amount'
        }
      ],
      currentOrder: 'asc',
      tableData: []
    }
  },
  watch: {
    // 添加监听方法，当query关键词输入完成鼠标移出时执行query方法，不然每次点击就会执行query方法
    query () {
      // console.log("on query change")
      //this.getList()
    }
  },
  methods: {
    productChange (obj) {
      console.log(obj.value)
      // 在data中设置products中的label和value值了
      this.productId = obj.value
      this.getList()
    },
    getStartDate (date) {
      this.startDate = date // 将得到的data赋值给定义的startDate
      this.getList()
    },
    getEndDate (date) {
      this.endDate = date
      this.getList()
    },
    getList () {
      let reqParams = {
        query: this.query,
        productId: this.productId,
        startDate: this.startDate,
        endDate: this.endDate
      }
      this.$http.post('/api/getOrderList', reqParams)
      .then((res) => {
        this.tableData = res.data.list
      }, (err) => {

      })
    },
    changeOrderType (headItem) {
      this.tableHeads.map((item) => {
        item.active = false
        return item
      })
      headItem.active = true
      if (this.currentOrder === 'asc') {
        this.currentOrder = 'desc'
      }
      else if (this.currentOrder === 'desc') {
        this.currentOrder = 'asc'
      }
      this.tableData = _.orderBy(this.tableData, headItem.key, this.currentOrder)
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}
</style>
