import Vue from 'vue'
import * as session from './session'
import * as cookies from './cookies'
import * as dataFormater from './dateFormate'
import {
  validater
} from './validate'

Vue.prototype.$session = session
Vue.prototype.$cookies = cookies
Vue.prototype.$dataFormater = dataFormater
Vue.prototype.$validater = validater