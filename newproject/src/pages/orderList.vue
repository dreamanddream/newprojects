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
          <!-- 循环遍历tableHeads，在方法中通过传参，添加active属性，绑定属性class，通过值的true或者false决定是否添加active类-->
          <th v-for="head in tableHeads" @click="changeOrderType(head)" :class="{active:head.active}">{{ head.label }}</th>
        </tr>
        <!-- 这里是双层渲染，首先要渲染表格每一行，其次是每一行中每一列，这里有个关键字key-->
        <tr v-for="item in tableData">
          <!-- 渲染列，按照表头中head中tableHeads中的key的顺序进行渲染一一对应 -->
          <td v-for="head in tableHeads">{{ item[head.key] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import VSelection from "../components/base/selection"; // 直接饮用selection，只需要在当前页面传递数据，由于selection.vue组件中样式使用scoped所以引入后样式不能用，要在当前页面重新写
import VDatePicker from "../components/base/datepicker"; // 引入安装后得datepicker
import _ from "lodash";
export default {
  components: {
    VSelection,
    VDatePicker
  },
  data() {
    return {
      query: "", // 代表在关键词input输入框中输入的词
      productId: 0, // 初始化下拉选择框prodectId为0
      startDate: "",
      endDate: "",
      products: [
        {
          label: "数据统计",
          value: 0
        },
        {
          label: "数据预测",
          value: 1
        },
        {
          label: "流量分析",
          value: 2
        },
        {
          label: "广告发布",
          value: 3
        }
      ],
      // 表头
      tableHeads: [
        {
          label: "订单号",
          key: "orderId"
        },
        {
          label: "购买产品",
          key: "product"
        },
        {
          label: "版本类型",
          key: "version"
        },
        {
          label: "有效时间",
          key: "period"
        },
        {
          label: "购买日期",
          key: "date"
        },
        {
          label: "数量",
          key: "buyNum"
        },
        {
          label: "总价",
          key: "amount"
        }
      ],
      currentOrder: "asc",
      // 定义tabledata用于获取数据
      tableData: []
    };
  },
  watch: {
    // 添加监听方法，当query关键词输入完成鼠标移出时执行query方法，不然每次点击就会执行query方法
    query() {
      // console.log("on query change")
      this.getList()
    }
  },
  methods: {
    productChange(obj) {
      console.log(obj.value);
      // 在data中设置products中的label和value值了
      this.productId = obj.value;
      this.getList();
    },
    getStartDate(date) {
      this.startDate = date; // 将得到的data赋值给定义的startDate
      this.getList();
    },
    // 根据四个选择器的条件，每次输入完成后都会发送请求数据。通过network中可以查看到，关键词输入完成后，日期选择后都会发送请求，执行getList方法
    getEndDate(date) {
      this.endDate = date;
      this.getList();
    },
    // 传递参数给后台将用户输入的关键词选择的产品类型，日期传递给后台，请求数据
    getList() {
      // 和后台约定好的字段
      let reqParams = {
        query: this.query,
        productId: this.productId,
        startDate: this.startDate,
        endDate: this.endDate
      };
      // 请求地址，得到请求数据，传递参数
      this.$http.post("/api/getOrderList", reqParams).then(
        (res) => {
          // 将获取的数据给tableData
          this.tableData = res.data.list;
        },(err)=> {}
      );
    },
    // 选中当前高亮
    changeOrderType(headItem) {
      // 首先将所有置灰
      this.tableHeads.map(item => {
        item.active = false;
        return item;
      });
      // 当前项设置为true
      headItem.active = true;
      // 设置排序方式，如果是正序就变成倒序，如果是倒序就正序
      if (this.currentOrder === "asc") {
        this.currentOrder = "desc";
      } else if (this.currentOrder === "desc") {
        this.currentOrder = "asc";
      }
      // 使用lodash中的orderby方法，第一个参数是要排序的数组，第二个参数根据哪一个项目排序，第三个参数是排序的方式
      this.tableData = _.orderBy(
        this.tableData,
        headItem.key,
        this.currentOrder
      );
    }
  },
  // 组件渲染完毕，就调用getList相当于初始化
  mounted() {
    this.getList();
  }
};
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
