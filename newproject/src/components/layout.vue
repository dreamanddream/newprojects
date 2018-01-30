<template>
  <div>
    <div class="app-head">
      <div class="app-head-inner">
        <!-- <img src="../assets/logo.png" alt=""> -->
        <!-- 设置点击图片跳转到首页 -->
        <router-link :to="{path:'/'}"><img src="../assets/logo.png" alt=""></router-link>
        <div class="head-nav">
          <ul class="nav-list">
            <li>{{ username }}</li>
            <!--当有了用户信息后，登录和注册都不再显示，所以要加一个判断-->
            <li v-if="username== ''" @click="logClick">登录</li>
            <li v-if="username!== ''">退出</li>
            <li v-if="username== ''" class="nav-pile">|</li>
            <li v-if="username== ''" @click="regClick">注册</li>
            <li class="nav-pile">|</li>
            <li @click="aboutClick">关于</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="app-content">
        <!--如果要有缓存使用keepalive-->
        <keep-alive>
          <!--在main.js中设置路由，一旦访问根路径就访问的是pages里面的index页面-->
          <router-view></router-view>
        </keep-alive>
    </div>
    <div class="app-foot">
      <p>© 2017</p>
    </div>
    <!--弹框内容：引入dialog组件,同时将isShow传递给子组件-->
    <!--以字符串的形式将变量名传递进来,在调用关闭时可以传递参数attr-->
    <mydialog :isShow="isShowAboutDialog" @on-close="closeDialog('isShowAboutDialog')">
      <p>此处省略关于部分</p>
    </mydialog>
    <mydialog :isShow="isShowRegDialog" @on-close="closeDialog('isShowRegDialog')">
     <reg-form></reg-form>
    </mydialog>
    <mydialog :isShow="isShowLogDialog" @on-close="closeDialog('isShowLogDialog')">
      <!--通过has-log获取存储在db中的username信息，并展示在页面中-->
      <log-form @has-log="onSuccessLog"></log-form>
    </mydialog>
  </div>
</template>

<script>
import dialog from './dialog'
import LogForm from './logForm'
import RegForm from './regForm'
export default {
  components: {
    mydialog: dialog,
    // 驼峰式在模板中使用可以转换为中划线的，引入组件，注册组件，使用组件
    LogForm,
    RegForm
  },
  data () {
    return {
      // 设置dialog默认关闭
      // isShowDialog: false,
      // 由于有不同的dialog，所以针对不同的进行设置
      isShowAboutDialog: false,
      isShowLogDialog: false,
      isShowRegDialog: false,
      username: ''
    }
  },
  methods: {
    // 点击关于设置dialog为true
    aboutClick () {
      this.isShowAboutDialog = true
    },
    logClick () {
      this.isShowLogDialog = true
    },
    regClick () {
      this.isShowRegDialog = true
    },
    // 点击关闭设置为false，弹框消失，传递参数
    closeDialog (attr) {
      this[attr] = false
    },
    onSuccessLog (data) {
      console.log('请求后的用户信息' + data.username)
      // 关闭组件弹框
      this.closeDialog('isShowLogDialog')
      // 异步获取登录的data
      this.username = data.username
    }
  }
}
</script>

<style>
/* 设置全局style，相当于common.css如果只是希望在局部中有效给style添加scope */

/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
body {
  background: #f0f2f5;
  font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  font-size: 14px;
  color: #444;
}
.app-head {
  background: #363636;
  color: #b2b2b2;
  height: 90px;
  line-height: 90px;
  width: 100%;
}
.app-head-inner {
  width: 1200px;
  margin: 0 auto;
}
.head-logo {
  float: left;
}
.app-head-inner img {
  width: 50px;
  margin-top: 20px;
}
.head-nav {
  float: right;
}
.head-nav ul {
  overflow: hidden;
}
.head-nav li {
  cursor: pointer;
  float: left;
}
.nav-pile {
  padding: 0 10px;
}
.app-foot {
  text-align: center;
  height: 80px;
  width: 100%;
  line-height: 80px;
  background: #e3e4e8;
  clear: both;
  margin-top: 30px;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
.hr {
  height: 1px;
  width: 100%;
  background: #ddd;
}
.button {
  background: #4fc08d;
  color: #fff;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
}
.button:hover {
  background: #4fc08d;
}
.g-form {

}
.g-form-line {
  padding: 15px 0;
}
.g-form-label {
  width: 100px;
  font-size: 16px;
  display: inline-block;
}
.g-form-input {
  display: inline-block;
}
.g-form-input input {
  height: 30px;
  width: 200px;
  line-height: 30px;
  vertical-align: middle;
  padding: 0 10px;
  border: 1px solid #ccc;
}
.g-form-btn {
  padding-left: 100px;
}
.g-form-error {
  color: red;
  padding-left: 15px;
}
</style>
