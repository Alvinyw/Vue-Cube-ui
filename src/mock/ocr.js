export default [{
    path: /ocr\/bankcard/,
    data: {
      code: '200000',
      message: '成功',
      data: {
        cardNum: "5187 1088 8888 8888",
        cardName: "招商银行",
        cardType: "2"
      }
    }
  },

  {
    path: /ocr\/idcard/,
    data: {
      code: '200000',
      message: '成功',
      data: {
        name: "张三",
        sex: "男",
        nation: "汉族",
        birth: "19880409",
        address: "广东省深圳市南山区",
        cardNum: "xxxxxx19880409xxxx",
        issuingAuthority: "南山区XX街道公安局",
        expiryDate: "20501018"
      }
    }
  }

]