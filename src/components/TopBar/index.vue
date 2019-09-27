<template>
  <nav class="topBar">
    <div class="nav-back" v-if="!hideBack" @click="navBack"></div>
    <!-- <slot v-else /> -->
    <div class="title">{{title}}</div>
    <div v-if="mode === 1"></div>
    <div v-if="!hideExplain && mode === 2" @click="switchLang">
      <img
        v-if="$i18n.locale === 'ct'"
        class="icon_lang"
        src="../../assets/images/icon_languange_cn.svg"
        alt
      />
      <img v-else class="icon_lang" src="../../assets/images/icon_languange_ct.svg" alt />
    </div>
    <div class="explain" v-if="!hideExplain && mode === 3" @click="showRemark">{{$t('m.说明')}}</div>
  </nav>
</template>

<script>
import { showDialog } from "@/utils/dialogConfig";
import { setLanguage, getProductCode } from "@/utils/session";

export default {
  name: "TopBar",
  props: {
    title: {
      type: String,
      default: ""
    },
    hideBack: {
      type: Boolean,
      default: false
    },
    hideExplain: {
      type: Boolean,
      default: false
    },
    customEvent: {
      type: Boolean,
      default: false
    },
    mode: {
      type: Number,
      default: 1 // 1 空 2 语言图标 3 说明文字
    }
  },
  methods: {
    navBack() {
      if (this.customEvent) {
        this.$emit("on-back");
      } else {
        this.$router.back();
      }
    },
    switchLang() {
      this.$i18n.locale = this.$i18n.locale === "zh" ? "ct" : "zh";
      document.title = `${this.$t("m.Vue-Cube-ui")} Demo`;
      setLanguage(this.$i18n.locale);
    },
    async showRemark() {
      const remark = await this.getRemark();
      showDialog(this, {
        title: this.$t("m.说明"),
        descArr: [remark],
        isExplain: true
      });
    },
    async getRemark() {
      const code = getProductCode();
      try {
        const resp = await this.$api.auth.getProductRemark(code);
        return Number(resp.code) === 200 && resp.data[0]
          ? resp.data[0].remark
          : "";
      } catch (error) {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.topBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 90px;
  background: #fff;
  padding: 0 30px;
  box-sizing: border-box;
  overflow: hidden;

  .nav-back {
    width: 36px;
    height: 36px;
    background: url(~images/base/back.png) no-repeat center center;
    background-size: contain;
    cursor: pointer;
  }
  .title {
    font-size: 36px;
  }
  .explain {
    font-size: 30px;
  }
  .icon_lang {
    width: 39px;
    height: 36px;
  }
  .img {
    width: 39px;
    height: 36px;
    font-size: 26px;
  }
}
</style>
