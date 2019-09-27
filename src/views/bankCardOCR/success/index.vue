<template>
  <div id="bankCardOCR_success" class="ocr">
    <TopBar :title="$t('m.识别结果')" :mode="1" />

    <h3>{{ $t('m.银行卡信息') }}</h3>
    <ul>
      <li>
        <span class="lt">{{ $t('m.银行卡号') }}</span>
        <span class="rt">{{ formData.cardNum }}</span>
      </li>
      <li>
        <span class="lt">{{ $t('m.卡类型') }}</span>
        <span class="rt">{{ formData.cardType | getBankCardType }}</span>
      </li>
      <li>
        <span class="lt">{{ $t('m.银行名称') }}</span>
        <span class="rt">{{ formData.cardName }}</span>
      </li>
    </ul>
    <div class="container pt80">
      <cube-button v-waves :primary="true" class="btnBack" @click="$router.go(-1)">{{ $t('m.返回') }}</cube-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Index",
  data() {
    return {
      formData: this.$session.getForm()
    };
  }
};
</script>
<style lang="scss" scoped>
#bankCardOCR_success {
  h3 {
    padding: 42px 25px 20px;
    font-size: 30px;
    color: #333;
  }
  ul {
    padding: 0 25px;
    background-color: #fff;
    li {
      padding: 22px 0;
      border-bottom: 1px solid #e6e6e6;
      span {
        display: inline-block;
        font-size: 28px;
        line-height: 1.5;
        vertical-align: middle;
      }
      .lt {
        width: 190px;
        color: #999;
      }
      .rt {
        width: 480px;
        color: #333;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
