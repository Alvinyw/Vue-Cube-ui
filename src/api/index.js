import Vue from 'vue'
import * as ocr from './ocr'
import * as auth from './auth'

Vue.prototype.$api = {
  ocr,
  auth
}
