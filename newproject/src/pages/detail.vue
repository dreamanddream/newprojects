<template>
  <div class="detail-wrap">
    <div class="detail-left">
      <div class="product-board">
        <!-- <img :src="productIcon"> -->
        <!--最原始通过img中src写图片路径-->
        <img src="../assets/images/1.png" alt="">
        <ul>
          <!--没有使用路由时，直接使用在li中使用v-for渲染数据-->
          <!-- <li v-for="item in products">{{ item.name }}</li> -->
          <!--设置路由后，结合router-link来渲染数据,用to来绑定需要跳转的地址，结合data数据中path：选项使用
          默认router-link生成a标签，这里使用tag属性指定生成li标签，active-class的使用可以再官网上查到信息,这里表示鼠标滑到当前位置当前位置添加active，
          如果自己不写active-class，那么默认会有一个router-link-active,但是我试了，为什么没有？？？？？？不会添加一个类-->
          <router-link v-for="item in products" :to="{ path: item.path }" tag="li" active-class="active">
            {{ item.name }}
          </router-link>
        </ul>
      </div>
    </div>
    <div class="detail-right">
      <!--这里也使用router-view自定义组件-->
      <keep-alive>
        <!--第一层router-view是layout.vue文件中使用的router-view，这套路由配置也是在main.js中进行设置的-->
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 这里的数据也可以使用请求的形式
      products: [
        {
          name: '数据统计22222',
          // 设置跳转路径，同样不能加/
          path: 'count',
          icon: require('../assets/images/1.png'),
          active: false
        },
        {
          name: '数据预测',
          path: 'forecast',
          active: false
        },
        {
          name: '流量分析',
          path: 'analysis',
          active: false
        },
        {
          name: '广告发布',
          path: 'publish',
          active: false
        }
      ],
      imgMap: {
        '/detail/count': require("../assets/images/1.png"),
        '/detail/forecast': require("../assets/images/2.png"),
        '/detail/analysis': require("../assets/images/3.png"),
        '/detail/publish': require("../assets/images/4.png")
      }
    }
  },
  computed: {
    productIcon () {
      return this.imgMap[this.$route.path]
    }
  }
}
</script>

<style>
.detail-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 20px;
}
.detail-left {
  float: left;
  width: 200px;
  text-align: center;
}
.detail-right {
  float: left;
  width: 980px;
  margin-left: 20px;
}
.product-board {
  background: #fff;
  padding: 20px 0;
}
.product-board ul {
  margin-top: 20px;
}
.product-board li {
  text-align: left;
  padding: 10px 15px;
  cursor: pointer;
}

.product-board li.active,
.product-board li:hover {
  background: #4fc08d;
  color: #fff;
}
.product-board li a {
  display: block;
}
.sales-board {
  background: #fff;
}
.sales-board-form {

}
.sales-board-intro h2 {
  font-size: 20px;
  padding: 20px;
}
.sales-board-intro p {
  background: #f7fcff;
  padding: 10px 20px;
  color: #999;
  line-height: 1.8;
}
.sales-board-form {
  padding: 30px 20px;
  font-size: 14px;
}
.sales-board-line {
  clear: both;
  padding-bottom: 20px;
}
.sales-board-line-left {
    display: inline-block;
    width: 100px;
}
.sales-board-line-right {
    display: inline-block;
    width: 75%;
}
.sales-board-des {
  border-top: 20px solid #f0f2f5;
  padding: 15px 20px;
}
.sales-board-des p {
  line-height: 1.6;
}
.sales-board-des h2 {
  font-size: 20px;
  padding-bottom: 15px;
}
.sales-board-des h3 {
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0 10px 0;
}
.sales-board-des li {
  padding: 5px 0;
}
.sales-board-table {
  width: 100%;
  margin-top: 20px;
}
.sales-board-table th {
  background: #4fc08d;
  color: #fff;
}
.sales-board-table td {
    border: 1px solid #f0f2f5;
    padding: 15px;
}
</style>

