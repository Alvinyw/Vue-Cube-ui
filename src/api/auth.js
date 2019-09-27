import request from '@/utils/request'

/**
 * 运营商认证
 * { idNum, mobile, name }
 **/
export function operateAuth(data) {
  return request({
    url: 'kyc/carriers/auth/detail',
    method: 'post',
    data
  })
}


/**
 * 人证认证
 * { idNum, name, facePic }
 **/
export function faceAuth(data) {
  return request({
    url: 'kyc/id-pic/match',
    method: 'post',
    data
  })
}

/**
 * 说明文字
 * { code }
 */
export function getProductRemark(code) {
  return request({
    url: 'product/info',
    method: 'get',
    params: {
      code
    }
  })
}