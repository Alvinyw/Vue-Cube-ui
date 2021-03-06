import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {
  getLanguage
} from '../utils/session'

Vue.use(VueI18n)

// 国际化
const i18n = new VueI18n({
  locale: getLanguage() ? getLanguage() : 'zh', // set locale
  messages: {
    zh: require('./zh-CN.js'), // 简体中文语言包
    en: require('./en.js'), // 英文语言包
    ct: require('./zh-TW.js') // 繁体中文语言包 
  }
})

export default i18n