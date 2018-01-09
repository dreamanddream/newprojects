<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <!--input使用model,用于传递数据,获取input中的值-->
          <input type="text"
          v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <!--验证input中的值，给出错误提示，考虑使用计算属性-->
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password"
          v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <!--点击登录调用onLogin方法，那么a标签本身的跳转呢？？？-->
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <!--显示错误信息-->
      <p>{{ errorText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 页面中的数据
      usernameModel: '',
      passwordModel: '',
      errorText: ''
    }
  },
  // 计算属性
  computed: {
    // 记录错误信息,每当input中的值改变时就会进行验证
    userErrors () {
      let errorText, status
      // 使用正则验证是否包含@符号
      if (!/@/g.test(this.usernameModel)) {
        status = false
        errorText = '不包含@，用户名需要包含@'
      } else {
        // 验证通过设置status状态为true
        status = true
        errorText = ''
      }
      // 目前是一打开页面就会显示报错信息，所以需要调整为用户输入后，才进行信息验证，设置一个flag标志
      // 第一次进来userFlag字符串为空，一旦执行后，设置为true，
      if (!this.userFlag) {
        errorText = ''
        this.userFlag = true
      }
      // 将错误信息返回
      return {
        // status: status,
        // errorText: errorText
        // 在vue中可以简写
        status,
        errorText
      }
    },
    // 给password添加验证信息
    passwordErrors () {
      let errorText, status
      if (!/^\w{1,6}$/g.test(this.passwordModel)) {
        status = false
        errorText = '密码不是1-6位'
      } else {
        status = true
        errorText = ''
      }
      // 设置密码的flag标志位
      if (!this.passwordFlag) {
        errorText = ''
        this.passwordFlag = true
      }
      return {
        status,
        errorText
      }
    }
  },
  // computed: {
  //   userErrors () {
  //     let errorText, status
  //     if (!/@/g.test(this.usernameModel)) {
  //       status = false
  //       errorText = '不包含@'
  //     } else {
  //       status = true
  //       errorText = ''
  //     }
  //     // if (!this.userFlag) {
  //     //   errorText = ''
  //     //   this.userFlag = true
  //     // }
  //     return {
  //       status,
  //       errorText
  //     }
  //   },
  //   passwordErrors () {
  //     let errorText, status
  //     if (!/^\w{1,6}$/g.test(this.passwordModel)) {
  //       status = false
  //       errorText = '密码不是1-6位'
  //     } else {
  //       status = true
  //       errorText = ''
  //     }
  //     // if (!this.passwordFlag) {
  //     //   errorText = ''
  //     //   this.passwordFlag = true
  //     // }
  //     return {
  //       status,
  //       errorText
  //     }
  //   }
  // },
  methods: {
    onLogin () {
      // 打印查看input中model值
      console.log(this.usernameModel)
      // 点击登录按钮进行拦截
      // status状态为false，表示验证未通过，加上！就变成了true，条件为true才执行
      if (!this.userErrors.status || !this.passwordErrors.status) {
        this.errorText = '部分选项未通过'
      } else {
        this.errorText = ''
        // 验证通过就执行数据请求
        this.$http.get('api/login')
        .then((res) => {
          this.$emit('has-log', res.data)
        }, (error) => {
          console.log(error)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
