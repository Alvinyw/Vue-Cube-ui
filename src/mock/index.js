import Mock from 'mockjs'
import ocr from './ocr'
import auth from './auth'
const data = [].concat(ocr, auth)

data.forEach(function (res) {
  Mock.mock(res.path, res.data)
})

export default Mock