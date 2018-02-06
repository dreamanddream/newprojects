<template>
  <div>
    <this-dialog :is-show="isShowCheckDialog" @on-close="checkStatus">
      请检查你的支付状态！
      <!-- 點擊支付成功需要核對訂單狀態 -->
      <div class="button" @click="checkStatus">
        支付成功
      </div>
      <div class="button" @click="checkStatus">
        支付失败
      </div>
    </this-dialog>
    <this-dialog :is-show="isShowSuccessDialog" @on-close="toOrderList">
      购买成功！
    </this-dialog>
    <this-dialog :is-show="isShowFailDialog" @on-close="toOrderList">
      购买失败！
    </this-dialog>
  </div>
</template>

<script>
import Dialog from '../components/dialog'
export default {
  components: {
    thisDialog: Dialog
  },
  props: {
    // 父級父级传递过来的
    isShowCheckDialog: {
      type: Boolean,
      default: false
    },
    // 接受父級傳遞的orderId
    orderId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      isShowSuccessDialog: false,
      isShowFailDialog: false
    }
  },
  methods: {
    checkStatus () {
      // 当点击支付成功或者支付失败或者叉号的时候，都要核对订单状态，发送请求，同时将orderId作为参数传递过去
      this.$http.post('/api/checkOrder', {
        // 然後將orderId作為參數，發送請求
        orderId: this.orderId
      })
      .then((res) => {
        this.isShowSuccessDialog = true
        // 這裡有個知識點，在子組件中不能直接修改父級傳遞過來的變量，就比如父級傳遞過倆的isShowCheckDialog
        // 這是vue的一個設計原則，數據在哪創建就在哪修改
        // 所以在這裡通過$emit，發出一個发出一个关闭事件。而在父組件中又定义了一个关闭事件on-close-check-dialog，從而可以实现关闭弹框
        this.$emit('on-close-check-dialog')
      }, (err) => {
        this.isShowFailDialog = true
        this.$emit('on-close-check-dialog')
      })
    },
    // 添加路由，跳转到订单页，$router.push是在组件内部的跳转，对比下router-link方法
    toOrderList () {
      this.$router.push({path: '/orderList'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
