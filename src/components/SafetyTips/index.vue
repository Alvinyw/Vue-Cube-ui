<template>
  <p id="safetyTips">
    <img :src="tipImgSrc" alt="安全提示" />
    <span>{{ tipText ? this.$t(`m['${tipText}']`) : tipText }}</span>
  </p>
</template>
<script>
export default {
  name: "SafetyTips",
  props: {
    tipImgSrc: {
      type: String,
      default: require("@/assets/images/id_protection.svg")
    },
    tipText: {
      type: String,
      default: "本操作将严格保护您的隐私安全，请放心操作"
    }
  }
};
</script>
<style lang="scss" scoped>
#safetyTips {
  margin-top: 40px;
  font-size: 24px;
  color: #999;
  text-align: center;
  img {
    height: 26px;
    margin-right: 10px;
    vertical-align: text-top;
  }
}
</style>