<template>
  <div id="IDcardOCR_failure">
    <TopBar :title="$t('m.识别结果')" :mode="1" />
    <div class="mainContent">
      <Result
        :title="$t('m.识别失败')"
        :desc="$t('m.无法识别信息，请确认图片内容是否清晰')"
        :imgSrc="require('@/assets/images/icon_defeat.svg')"
      />
    </div>
    <div class="container">
      <cube-button v-waves :primary="true" class="btnBack" @click="$router.go(-1)">{{$t('m.返回')}}</cube-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Index"
};
</script>
<style lang="scss" scoped>
#IDcardOCR_failure {
  .mainContent {
    margin-top: 20px;
  }
  .container {
    padding-top: 80px;
  }
}
</style>
