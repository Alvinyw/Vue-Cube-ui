import {
  appSetting
} from '../setting/app'
import i18n from '../lang'

// 产品管理模块 的全局方法
const appFilters = {

  // 获取产品类型描述
  getBankCardType: function (val) {
    if (!val) return ''
    const curLang = i18n.messages[i18n.locale].m
    const _res = appSetting.bankCardtypes.find((value) => {
      return value.value === Number(val);
    });
    return _res ? curLang[`${_res.label}`] : _res;
  }

}

export default appFilters