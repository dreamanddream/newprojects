<template>
  <div class="sales-board">
      <div class="sales-board-intro">
        <h2>流量分析</h2>
        <p>是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
      </div>
      <div class="sales-board-form">
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  购买数量：
              </div>
              <div class="sales-board-line-right">
                <!-- 将组件中的东西传出来，通过$event传递,通过attr可以获取buyNum属性 -->
                  <v-counter @on-change="onParamChange('buyNum' , $event)"></v-counter>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品类型：
              </div>
              <div class="sales-board-line-right">
                <!-- 添加on-change监听 -->
                  <v-selection :selections="buyTypes" @on-change="onParamChange('buyType', $event)"></v-selection>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  有效时间：
              </div>
              <div class="sales-board-line-right">
                  <v-chooser :selections="periodList" @on-change="onParamChange('period', $event)"></v-chooser>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品版本：
              </div>
              <div class="sales-board-line-right">
                    <v-mul-chooser :selections="versionList" @on-change="onParamChange('versions', $event)"></v-mul-chooser>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  总价：
              </div>
              <div class="sales-board-line-right">
               {{ price }} 元
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">&nbsp;</div>
              <div class="sales-board-line-right">
                  <div class="button" @click="showPayDialog">
                    立即购买
                  </div>
              </div>
          </div>
      </div>
      <div class="sales-board-des">
        <h2>产品说明</h2>
        <p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>
        <h3>用户行为指标</h3>
        <ul>
          <li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
          <li>用户在网站的停留时间；</li>
          <li>用户来源网站（也叫“引导网站”）；</li>
          <li>用户所使用的搜索引擎及其关键词；</li>
          <li>在不同时段的用户访问量情况等。</li>
        </ul>

        <h3>浏览网站方式</h3>
        <ul>
          <li>用户上网设备类型</li>
          <li>用户浏览器的名称和版本</li>
          <li>访问者电脑分辨率显示模式</li>
          <li>用户所使用的操作系统名称和版本</li>
          <li>用户所在地理区域分布状况等</li>
        </ul>
      </div>
      <!-- 弹框 -->
       <my-dialog :is-show="isShowPayDialog" @on-close="hidePayDialog">
        <table class="buy-dialog-table">
          <tr>
            <th>购买数量</th>
            <th>产品类型</th>
            <th>有效时间</th>
            <th>产品版本</th>
            <th>总价</th>
          </tr>
          <tr>
            <!-- 直接动态获取数据  -->
            <td>{{ buyNum }}</td>
            <td>{{ buyType.label }}</td>
            <td>{{ period.label }}</td>
            <td>
              <span v-for="item in versions">{{ item.label }}</span>
            </td>
            <td>{{ price }}</td>
          </tr>
        </table>
        <h3 class="buy-dialog-title">请选择银行</h3>
        <bank-chooser @on-change="onChangeBanks"></bank-chooser>
        <div class="button buy-dialog-btn" @click="confirmBuy">
          确认购买
        </div>
      </my-dialog>
      <my-dialog :is-show="isShowErrDialog" @on-close="hideErrDialog">
        支付失败！
      </my-dialog>
      <!-- 支付狀態的提示框 -->
      <check-order :is-show-check-dialog="isShowCheckOrder" :order-id="orderId" @on-close-check-dialog="hideCheckOrder"></check-order>
  </div>
</template>

<script>
import VSelection from '../../components/base/selection' // 下拉组件
import VChooser from '../../components/base/chooser' // 单选
import VMulChooser from '../../components/base/multiplyChooser' // 多选
import VCounter from '../../components/base/counter.vue' // 数量选择
import _ from 'lodash' // 通过npm已经安装过
import Dialog from '../../components/dialog' // 引入弹框
import BankChooser from '../../components/bankChooser' // 引入银行选择
import CheckOrder from '../../components/checkOrder' // 訂單狀態核對
export default {
  components: {
    VSelection,
    VChooser,
    VMulChooser,
    VCounter,
    MyDialog: Dialog,
    BankChooser,
    CheckOrder
  },
  data () {
    return {
      price: 0,
      // 定义数据变量,当组件change时，赋给这些变量，同时要修改前面的emit触发触底的值
      buyNum: 0,
      buyType: {},
      versions: [], // 为什么要将versions设置成数组，其他两个是对象？？？？
      period: {},
      buyTypes: [
        {
          label: '入门版',
          value: 0
        },
        {
          label: '中级版',
          value: 1
        },
        {
          label: '高级版',
          value: 2
        }
      ],
      periodList: [
        {
          label: '半年',
          value: 0
        },
        {
          label: '一年',
          value: 1
        },
        {
          label: '三年',
          value: 2
        }
      ],
      versionList: [
        {
          label: '高级',
          value: 0
        },
        {
          label: '中级',
          value: 1
        },
        {
          label: '低级',
          value: 2
        }
      ],
      // 定义弹框的初始状态
      isShowPayDialog: false,
      isShowCheckOrder: false,
      isShowErrDialog: false,
      // 银行id 訂單狀態orderId
      bankId: null,
      orderId: null
    }
  },
  methods: {
    // 这个函数是设置监听，获取相关信息
    onParamChange (attr, val) {
      this[attr] = val
      // attr是属性，也就是buyNum等，而this[attr]则是数量2，3
      console.log(attr, this[attr])
      this.getPrice() // 调用
    },
    // 通过vue-resource发送ajax请求
    // passParams是定义的对象
    // getPrice是处理数据，传递数据，响应数据
    getPrice () {
      // 这里需要处理versions，使用lodash，使用map遍历数组versions,同时使用了箭头函数
      let buyVersionsArray = _.map(this.versions, (item) => {
        return item.value // buyVersionsArray被处理成一个只包含value值而没有label的数组，然后通过下面的join处理成字符串
      })
      // 其中passParams的定义需要和后端约定是什么类型。
      let reqParams = {
        buyNumber: this.buyNum, // 在data中定义的参数
        buyTypes: this.buyType.value,
        period: this.period.value, // 因为不需要获取对象，只需要获取对象中的具体value,不需要label
        version: buyVersionsArray.join(',') // 如果得到的是[1,2,3],那么经过join处理得到1,2,3这样的字符串
      }
      // /api/getPrice请求的地址,将getPrice中的数据写到db中，后端根据reqParams返回amount数据
      this.$http.post('/api/getPrice', reqParams).then((res) => {
        // res
        this.price = res.data.amount
        console.log('响应返回的数据' + res.data.amount)
      })
    },
    // 弹框的现实与隐藏
    showPayDialog () {
      this.isShowPayDialog = true
    },
    hidePayDialog () {
      this.isShowPayDialog = false
    },
    hideErrDialog () {
      this.isShowErrDialog = false
    },
    hideCheckOrder () {
      this.isShowCheckOrder = false
    },
    // 银行
    onChangeBanks (bankObj) {
      this.bankId = bankObj.id
      // console.log('查看银行id' + this.bankId)
    },
    // 点击立即购买
    confirmBuy () {
      let buyVersionsArray = _.map(this.versions, (item) => {
        return item.value
      })
      let reqParams = {
        buyNumber: this.buyNum,
        buyType: this.buyType.value,
        period: this.period.value,
        version: buyVersionsArray.join(','),
        bankId: this.bankId
      }
      this.$http.post('/api/createOrder', reqParams)
      .then((res) => {
        // 请求成功后，后端会返回一个订单号id,这里是在db.json中写死的一个orderId
        this.orderId = res.data.orderId
        this.isShowCheckOrder = true
        this.isShowPayDialog = false // 這個是出現銀行的彈框
      }, (err) => {
        // 請求失敗時候的設置
        this.isShowBuyDialog = false
        this.isShowErrDialog = true
      })
    }
  },
  // 初始化四个数据：数量，版本，有效时间，类型
  mounted () {
    this.buyNum = 1
    this.buyType = this.buyTypes[0]
    this.versions = [this.versionList[0]]
    this.period = this.periodList[0]
    this.getPrice()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buy-dialog-title {
  font-size: 16px;
  font-weight: bold;
}
.buy-dialog-btn {
  margin-top: 20px;
}
.buy-dialog-table {
  width: 100%;
  margin-bottom: 20px;
}
.buy-dialog-table td,
.buy-dialog-table th{
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 5px 0;
}
.buy-dialog-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
}
</style>
