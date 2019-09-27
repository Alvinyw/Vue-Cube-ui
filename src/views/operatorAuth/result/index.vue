<template>
  <div class="auth">
    <TopBar :title="$t('m.认证结果')" />
    <Result
      class="auth-top"
      v-if="Number($route.query.result) === 1"
      :imgSrc="successImg"
      :title="$t('m.认证一致')"
      :desc="$t('m.运营商认证结果匹配一致')"
    />
    <Result
      class="auth-top"
      v-else
      :imgSrc="defeatImg"
      :title="$t('m.认证不一致')"
      :desc="$t('m.认证结果不一致，请重新核实')"
    />
    <cube-button v-waves class="auth-btn" type="submit" @click="$router.go(-1)">{{$t('m.返回')}}</cube-button>
  </div>
</template>

<script>
import Result from "@/components/Result";
import successImg from "@/assets/images/icon_success.svg";
import defeatImg from "@/assets/images/icon_defeat.svg";

export default {
  name: "Index",
  components: {
    Result
  },
  data() {
    return {
      successImg,
      defeatImg
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/auth.scss";
</style>
