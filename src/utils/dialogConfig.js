export const showDialog = function (vm, {
  title,
  imgPath,
  descArr,
  isExplain // 是否是说明文本
}) {

  vm.$createDialog({
      type: 'alert',
      maskClosable: true,
      confirmBtn: {
        text: '我知道了',
        active: true,
      },
    },
    createElement => {
      // img
      let imgElement = null
      if (imgPath && imgPath !== '') {
        imgElement = createElement('img', {
          class: {
            'cube-dialog-mytitle-img': true,
          },
          attrs: {
            src: imgPath,
          },
        })
      }
      // desc
      let descElement = null
      if (descArr && descArr.length > 0) {
        let arr = []
        for (let i = 0; i < descArr.length; i++) {
          arr.push(createElement('p', descArr[i]))
        }
        descElement = createElement(
          'div', {
            class: {
              'cube-dialog-mycontent': true,
              'isExplain': isExplain,
            },
            slot: 'content',
          },
          arr
        )
      }

      return [
        createElement(
          'div', {
            class: {
              'cube-dialog-mytitle': true,
            },
            slot: 'title',
          },
          [
            createElement(
              'h3', {
                class: 'cube-dialog-mytitle-text',
              },
              title
            ),
            imgElement
          ]
        ),
        descElement
      ];
    }
  ).show();
}