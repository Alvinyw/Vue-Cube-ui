const Language = 'language'
const Form = 'form'
const ProductCode = 'ProductCode'
const BankCard = 'bankCard'
const PDFURL = 'PDFurl'

// 当前语言
export function getLanguage() {
  return sessionStorage.getItem(Language)
}
export function setLanguage(lang) {
  return sessionStorage.setItem(Language, lang)
}
export function removeLanguage() {
  return sessionStorage.removeItem(Language)
}

export function getForm() {
  return JSON.parse(sessionStorage.getItem(Form)) ? JSON.parse(sessionStorage.getItem(Form)) : {}
}
export function setForm(val) {
  return sessionStorage.setItem(Form, JSON.stringify(val))
}
export function removeForm() {
  return sessionStorage.removeItem(Form)
}

// 产品编码
export function getProductCode() {
  return sessionStorage.getItem(ProductCode)
}
export function setProductCode(val) {
  return sessionStorage.setItem(ProductCode, val)
}
export function removeProductCode() {
  return sessionStorage.removeItem(ProductCode)
}

// 银行卡信息
export function getBankCard() {
  return JSON.parse(sessionStorage.getItem(BankCard)) ? JSON.parse(sessionStorage.getItem(BankCard)) : {}
}
export function setBankCard(val) {
  return sessionStorage.setItem(BankCard, JSON.stringify(val))
}
export function removeBankCard() {
  return sessionStorage.removeItem(BankCard)
}

// 已签章 PDF URL
export function getPDFURL() {
  return sessionStorage.getItem(PDFURL)
}
export function setPDFURL(val) {
  return sessionStorage.setItem(PDFURL, val)
}
export function removePDFURL() {
  return sessionStorage.removeItem(PDFURL)
}