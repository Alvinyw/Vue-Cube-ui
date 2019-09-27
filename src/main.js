import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import 'amfe-flexible'

import store from './store'
import router from './router'

import './api'
import './utils' // 引入工具库

import '@/styles/index.scss' // global css
import './components/install'
import './directive/install'
import './setting' // 引入全局设置文件
import './filters'
import i18n from './lang' // 引入多语言配置文件
import './mock'

// 移动端控制台
// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// Vue.use(vConsole)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})