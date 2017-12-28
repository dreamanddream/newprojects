<template>
  <div class="index-wrap">
    <div class="index-left">
      <div class="index-left-block">
        <h2>全部产品</h2>
        <!--这里的template相当于div，将h3和ul包裹起来，使用v-for实现渲染-->
        <template v-for="product in productList">
          <h3>{{ product.title }}</h3>
          <ul>
            <li v-for="item in product.list">
              <!--绑定url，用v-bind-->
              <a :href="item.url">{{item.name}}</a>
              <!--为了凸显出热门也要加一个判断-->
              <span v-if="item.hot" class="hot-tag">HOT</span>
            </li>
          </ul>
          <!--这里最后一个不需要hr线-->
          <div class="hr" v-if="!product.last"></div>
        </template>
      </div>
      <div class="index-left-block lastest-news">
        <h2>最新消息</h2>
        <ul>
          <li v-for="item in newList">
            <a :href="item.url">{{item.title}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="index-right">
      <div class="index-board-list">
      <!--在css中设置最右边margin-right为0，同时通过index,index从0开始.
      绑定一个类，这个绑定的类和原始类可以并存，互不影响。判定div的div的余数，从而給偶数添加某个类,同时这里数组和对象可以混用，出现两个类可以用数组-->
        <div class="index-board-item" v-for="(item,index) in boardList" :class="[{'line-last' : index % 2 !==0},'index-board-' + item.id]">
         <div class="index-board-item-inner">
          <h2>{{item.title}}</h2>
          <p>{{item.description}}</p>
          <div class="index-board-button">
            <a href="" class="button">立即购买</a>
          </div>
         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import slideShow from '../components/slideShow'
export default {
  data () {
    return {
      // 要看不同数据的不同写法！！！！！！！！
      // 显示首页中的品牌栏目
      boardList: [
        {
          title: '开放产品',
          description: '开放产品是一个新产品',
          saleout: false,
          // 显示对应的图片可以通过id也可以通过index，可以看下对应图片的css写法
          id:'car'
        },
        {
          title: '品牌营销',
          description: '品牌营销帮助你的产品',
          saleout: false,
          id: 'earth'
        },
        {
          title: '使命必达',
          description: '品牌营销帮助你的产品',
          saleout: true,
          id: 'loud'
        },
        {
          title: '马到成功',
          description: '品牌营销帮助你的产品',
          saleout: true,
          id: 'hill'
        }
      ],
      // 渲染news页面,这是一个数组
      newList:[
        {
          title:'新闻1',
          url:'http://starcraft.com'
        },
        {
          title:'新闻2',
          url:'http://starcraft.com'
        },
        {
          title:'新闻3',
          url:'http://starcraft.com'
        },
        {
          title:'新闻4',
          url:'http://starcraft.com'
        }
      ],
      // 通过vue渲染产品页面
      productList: {
        pc: {
          title: 'pc产品',
          list: [
            {
              name: '数据统计',
              url: 'http://starcraft.com'
            },
            {
              name: '数据预测',
              url: 'http://warcraft.com'
            },
            {
              name: '流量分析',
              url: 'http://overwatch.com',
              hot: true // 在这做个添加热门标签的标记
            },
            {
              name: '广告发布',
              url: 'http://hearstone.com'
            }
          ]
        },
        app: {
          title: '手机应用类',
          // 标记一下，判断是否是最后一个
          last: true,
          list: [
            {
              name: '91助手',
              url: 'http://weixin.com'
            },
            {
              name: '产品助手',
              url: 'http://twitter.com',
              hot: true
            },
            {
              name: '智能地图',
              url: 'http://maps.com'
            },
            {
              name: '团队语音',
              url: 'http://phone.com'
            }
          ]
        }
      }
    }
  }
}
</script>

<style scoped>
/* 为了避免全局污染给style添加了scoped，这样样式只在当前页面有效 */
.index-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.index-left {
  float: left;
  width: 300px;
  text-align: left;
}
.index-right {
  float: left;
  width: 900px;
}
.index-left-block {
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
}
.index-left-block .hr {
  margin-bottom: 20px;
}
.index-left-block h2 {
  background: #4fc08d;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}
.index-left-block ul {
  padding: 10px 15px;
}
.index-left-block li {
  padding: 5px;
}
.index-board-list {
  overflow: hidden;
}
.index-board-item {
  float: left;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.index-board-item-inner {
  min-height: 125px;
  padding-left: 120px;
}
.index-board-car .index-board-item-inner{
  background: url(../assets/images/1.png) no-repeat;
}
.index-board-loud .index-board-item-inner{
  background: url(../assets/images/2.png) no-repeat;
}
.index-board-earth .index-board-item-inner{
  background: url(../assets/images/3.png) no-repeat;
}
.index-board-hill .index-board-item-inner{
  background: url(../assets/images/4.png) no-repeat;
}
.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}
.line-last {
  margin-right: 0;
}
.index-board-button {
  margin-top: 20px;
}
.lastest-news {
  min-height: 512px;
}
.hot-tag {
  background: red;
  color: #fff;
}
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

