// 组件全局注册
import Vue from 'vue'

import TopBar from './TopBar'
import Loading from './Loading'
import Result from './Result'
import SafetyTips from './SafetyTips'
import CamerasAlbums from './CamerasAlbums'
import StepList from './StepList'

// 组件库
const Components = [TopBar, Loading, Result, SafetyTips, CamerasAlbums, StepList]

// 注册全局组件
Components.map(com => {
  Vue.component(com.name, com)
})

export default Vue