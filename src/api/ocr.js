import request from '@/utils/request'

/**
 * 身份证OCR
 * {
 * image: "",
 * imageType: URL/BASE64 ,
 * ocrType: 0/1
 * }**/
export function IDcard(data) {
  return request({
    url: 'ocr/idcard',
    method: 'post',
    data
  })
}

/**
 * 银行卡OCR
 * {
 * image: "",
 * imageType: URL/BASE64 ,
 }**/
export function bankCard(data) {
  return request({
    url: 'ocr/bankcard',
    method: 'post',
    data
  })
}