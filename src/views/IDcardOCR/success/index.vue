<template>
  <div id="IDcardOCR_success" class="ocr">
    <TopBar :title="$t('m.识别结果')" :mode="1" />

    <h3>{{ $t('m.人像面信息') }}</h3>
    <ul>
      <li>
        <span class="lt">{{ $t('m.姓名') }}</span>
        <span class="rt">{{ formData.name }}</span>
      </li>
      <li>
        <span class="lt">{{ $t('m.性别') }}</span>
        <span class="rt">{{ formData.sex }}</span>
      </li>
      <li>
        <span class="lt">{{ $t('m.民族') }}</span>
        <span class="rt">{{ formData.nation }}</span>
      </li>
      <li>
        <span class="lt">{{ $t('m.出身日期') }}</span>
        <span class="rt">{{ formData.birth }}</span>
      </li>
      <li>
        <span class="lt">{{ $t('m.住址') }}</span>
        <span class="rt">{{ formData.address }}</span>
      </li>
      <li>
        <span class="lt">{{ $t('m.身份证号') }}</span>
        <span class="rt">{{ formData.cardNum }}</span>
      </li>
    </ul>
    <h3>{{ $t('m.国徽面信息') }}</h3>
    <ul>
      <li>
        <span class="lt">{{ $t('m.签发机关') }}</span>
        <span class="rt">{{ formData.issuingAuthority }}</span>
      </li>
      <li>
        <span class="lt">{{ $t('m.有效日期') }}</span>
        <span class="rt">{{ formData.expiryDate }}</span>
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
#IDcardOCR_success {
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
