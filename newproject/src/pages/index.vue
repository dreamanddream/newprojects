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
            <a :href="item.url" class="new-item">{{item.title}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="index-right">
      <!--考虑到不同页面都要调用这个内容，所以是根据传递进行调用-->
      <!--将数据传递到子组件-->
      <slide-show :slides="slides" :inv="invTime"></slide-show>
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
// 使用es6的方式引入slideShow组件
import slideShow from '../components/slideShow'
export default {
  // 注册组件，然后在template中使用
  components: {
    slideShow
  },
  // 使用vue注册的组件进行数据请求
  created: function () {
    // 请求是一个prime对象,有一个then方法
    // 这里也可以使用post请求,传递参数
    /* this.$http.post('getList', {userId: 123}) */
    // 同时要注意如果getNewsList文件设置需要有id，要不会有错误，自己可以看下，什么原因？？？？？？？
    // 通过ajax进行后台信息请求，同时利用了jsonserver，请求api路径下的json数据
    this.$http.post('api/getNewsList')
    // then方法接受两个函数，一个是成功回调，一个是失败回调
    // 使用箭头函数
    .then((res) => {
      this.newList = res.data
      console.log(res.data)
    }, (err) => {
      console.log(err)
    })
    // 以下是原始写法，上面是箭头函数
    // .then(function (res) {
    //   // 将请求成功的数据，赋给newList,this是在闭包内,代码环境下的this，而不是执行环境下的this
    //   this.newsList = res.data
    //   console.log(data)
    // }, function (err) {
    //   console.log(err)
    // })
  },
  data () {
    return {
      // 轮播图片数据设置
      invTime: 2000,
      slides: [
        {
          // 使用require引入，通过webpack将图片解析到相应位置。打包后，变成了解析后的地址。引入图片使用require？
          // 如果不使用require，webpack不会当成模块处理，会找不到路径
          // 当模板使用时要加入require，src都要加入require
          src: require('../assets/slideShow/pic1.jpg'),
          title: 'xxx1',
          href: 'detail/analysis'
        },
        {
          src: require('../assets/slideShow/pic2.jpg'),
          title: 'xxx2',
          href: 'detail/count'
        },
        {
          src: require('../assets/slideShow/pic3.jpg'),
          title: 'xxx3',
          href: 'http://xxx.xxx.com'
        },
        {
          src: require('../assets/slideShow/pic4.jpg'),
          title: 'xxx4',
          href: 'detail/forecast'
        }
      ],

      // 要看不同数据的不同写法！！！！！！！！
      // 显示首页中的品牌栏目
      boardList: [
        {
          title: '开放产品',
          description: '开放产品是一个新产品',
          saleout: false,
          // 显示对应的图片可以通过id也可以通过index，可以看下对应图片的css写法
          id: 'car'
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
      newList: [
        // 将请求的成功的数据填充到这
        // {
        //   title: '新闻1',
        //   url: 'http://starcraft.com'
        // },
        // {
        //   title: '新闻2',
        //   url: 'http://starcraft.com'
        // },
        // {
        //   title: '新闻3',
        //   url: 'http://starcraft.com'
        // },
        // {
        //   title: '新闻4',
        //   url: 'http://starcraft.com'
        // }
      ],
      // 通过vue渲染产品页面
      productList: {
        pc: {
          title: 'pc产品',
          list: [
            {
              name: '数据统计',
              url: '/detail/count'
            },
            {
              name: '数据预测',
              url: '/detail/forecase'
            },
            {
              name: '流量分析',
              url: '/detail/analysis',
              hot: true // 在这做个添加热门标签的标记
            },
            {
              name: '广告发布',
              url: '/detail/publish'
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

