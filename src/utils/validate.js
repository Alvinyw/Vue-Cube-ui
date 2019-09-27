/**
 * @desc 基于ElementUI Form rules 进行使用, 参考官方文档: http://element-cn.eleme.io/#/zh-CN/component/form [自定义校验规则]
 * @example  rules: {
 *  ip: [
 *    {required: true, message: '请输入矩阵IP', trigger: 'blur'},
 *    {validator: this.$rules.ipAddress, trigger: 'blur'}
 *  ]
 * }
 *
 */
export const validater = {

  /**
   * 校验 是否是链接
   */
  isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  },

  /**
   * 校验 包括中文字、英文字母、数字和下划线
   * 登录账号校验
   */
  account(rule, value, callback) {
    const acount = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/
    if (value && (!(acount).test(value))) {
      callback(new Error('账号不符合规范'))
    } else {
      callback()
    }
  },

  /**
   * 输入纯数字，不能带小数点，不能超过 17 位
   */
  number(rule, value, callback) {
    if (!value) {
      return callback();
    }
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else if (value.toString().length > 17) {
        callback(new Error("输入的数字过大"));
      } else {
        callback();
      }
    }, 100);
  },

  /**
   * 输入的 string 只能是数字，无长度限制，非必填
   *  */
  strNumber(rule, value, callback) {
    if (!value) {
      callback();
    } else if (!new RegExp(/[^\d.]/g).test(value)) {
      callback();
    } else {
      callback(new Error("请输入数字"));
    }
  },

  /**
   * 输入数字或带小数点的数字，不能输入 05 / .5 等格式数据
   *  */
  price(rule, value, callback) {
    // new RegExp(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/g)
    if (!value) {
      callback();
    } else if (!(/^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/).test(value)) {
      callback(new Error("数据格式不正确，请输入数字且小数点后不超过两位"));
    } else {
      callback();
    }
  },

  /**
   * IP地址校验
   */
  ipAddress(rule, value, callback) {
    if (!value) {
      callback(new Error('请输入IP地址'))
    }
    if (value && !(/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/).test(value)) {
      callback(new Error('IP地址不符合规范'))
    } else {
      callback()
    }
  },

  /**
   * 手机号码校验
   */
  phoneNumber(rule, value, callback) {
    // var myreg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    if (value && (!(/^[1][34578]\d{9}$/).test(value) || !(/^[1-9]\d*$/).test(value) || value.length !== 11)) {
      callback(new Error('手机号码不符合规范'))
    } else {
      callback()
    }
  },

  /**
   * 电话号码校验
   */
  telephoneNumber(rule, value, callback) {
    if (value && (!(/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/).test(value))) {
      callback(new Error('电话号码不符合规范'))
    } else {
      callback()
    }
  },

  /**
   * 邮箱校验
   */
  email(rule, value, callback) {
    // var myreg = /^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$/;
    const temp = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/
    // let tempOne = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
    if (value && (!(temp).test(value))) {
      callback(new Error('邮箱格式不符合规范'))
    } else {
      callback()
    }
  },

  /**
   * 身份证号码校验
   */
  idCard(rule, value, callback) {
    if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
      callback(new Error('身份证号码不符合规范'))
    } else {
      callback()
    }
  },

  /**
   * 正整数校验
   */
  integerP(rule, value, callback) {
    if (value && !(/^[1-9]\d*$/).test(value)) {
      callback(new Error('只能填写正整数'))
    } else {
      callback()
    }
  },

  /**
   * 负整数校验
   */
  integerN(rule, value, callback) {
    if (value && !(/^-[1-9]\d*$/).test(value)) {
      callback(new Error('只能填写负整数'))
    } else {
      callback()
    }
  },

  /**
   * 英文字符校验
   */
  enText(rule, value, callback) {
    // let a = '',
    //   arr = value.split(" ")
    // for (let i = 0; i < arr.length; i++) { //删除行内空格
    //   a += arr[i];
    // }
    if (value && !(/^[A-Za-z]+$/).test(value)) {
      callback(new Error('只能填写英文字符'))
    } else {
      callback()
    }
  },

  /**
   * 中文字符英文字符校验
   */
  ChEnText(rule, value, callback) {
    if (value && !(/^[A-Za-z0-9]+$/).test(value)) {
      callback(new Error('只能填写数字和英文字符'))
    } else {
      callback()
    }
  },

  /**
   * 中文字符校验
   */
  cnText(rule, value, callback) {
    // let a = '',
    //   arr = value.split(" ")
    // for (let i = 0; i < arr.length; i++) { //删除行内空格
    //   a += arr[i];
    // }
    if (value && (/[^\u4e00-\u9fa5]/).test(value)) {
      callback(new Error('只能填写中文字符'))
    } else {
      callback()
    }
  },

  /**
   * 只能输入英文或者数字
   */
  enOrnunText(rule, value, callback) {
    if (value && !(/^[A-Za-z0-9]+$/).test(value)) {
      callback(new Error('只能填写英文或者数字'))
    } else {
      callback()
    }
  },

  /**
   * 20位数字国标编码校验，且为正整数
   */
  validateDeviceNo(rule, value, callback) {
    if (value && !(/^[1-9]\d*$/).test(value)) {
      callback(new Error('只能填写正整数'))
    } else {
      if (!/^[0-9]{20}$/.test(value)) {
        callback(new Error('请输入20位数字的编码！'));
      } else {
        callback();
      }
    }
  },

  /**
   *校验电脑Mac地址
   *以xx-xx-xx-xx-xx-xx的形式输入（xx为16进制数字）
   */
  validateMac(rule, value, callback) {
    const temp = /[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}/;
    if (!temp.test(value)) {
      callback(new Error('请输入xx-xx-xx-xx-xx-xx形式的MAC地址！'));
    } else {
      callback();
    }
  },

  /**
   * 校验地址代码或者分组代码
   */
  validateCode(rule, value, callback) {
    const num = /^[1-9]\d*$/
    if (value && !(num).test(value)) {
      callback(new Error('只能填写正整数'))
    } else {
      const valueLen = value.toString().length
      console.log(valueLen)
      if (valueLen > 0 && valueLen % 3 !== 0) {
        callback(new Error('输入的长度必须是3的倍数'))
      } else if (valueLen > 18) {
        callback(new Error('输入的长度不能超过18位,请重新输入'))
      } else {
        callback()
      }
    }
  },

  /**
   * 校验字符长度
   */
  validateLength(rule, value, callback) {
    const valueLen = value.toString().length
    if (valueLen > 18) {
      callback(new Error('输入的长度不能超过20位,请重新输入'))
    }
  },

  /**
   * 数字 ,两位
   */
  validateTwoNum(rule, value, callback) {
    const temp = /^[1-9]{2}$/;
    if (!temp.test(value)) {
      callback(new Error('请输入两位正整数！'));
    } else {
      callback();
    }
  },

  /**
   * 校验经度是否符合规范
   */
  checkLongitude(rule, value, callback) {
    const longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
    if (!longrg.test(value)) {
      callback(new Error('经度整数部分为0-180,小数部分为0到6位!'));
    } else {
      callback();
    }
  },

  /**
   * 校验纬度是否符合规范
   */
  checkLatitude(rule, value, callback) {
    var latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
    if (!latreg.test(value)) {
      callback(new Error('纬度整数部分为0-90,小数部分为0到6位!'));
    } else {
      callback();
    }
  }
}
