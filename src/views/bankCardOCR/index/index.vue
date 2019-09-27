<template>
  <div id="bankCardOCR_index">
    <TopBar :title="$t('m.银行卡OCR')" :mode="3" />
    <div class="container">
      <cameras-albums
        :click-image-src="require('@/assets/images/bank_clickUp.svg')"
        :click-text="$t('m.点击上传银行卡照片')"
        @clickSample="BankCardSample"
        @setData="setBankData"
      ></cameras-albums>

      <safety-tips></safety-tips>
      <cube-button
        :primary="true"
        v-waves
        class="mt80"
        @click="handleOCR"
        :disabled="!ifAllowOCR"
      >{{ $t('m.点击识别') }}</cube-button>
      <Loading v-show="ifOCRing" display="block" />
    </div>
  </div>
</template>
<script>
import { showDialog } from "@/utils/dialogConfig";
import CamerasAlbums from "@/components/CamerasAlbums";
import imgBankCard from "@/assets/images/img_bankCard.png";

export default {
  name: "BankCardOCRIndex",
  components: { CamerasAlbums },
  data() {
    return {
      ifAllowOCR: false, // 是否允许 OCR
      ifOCRing: false, // 是否正在识别
      bankCardData: ""
    };
  },
  methods: {
    BankCardSample() {
      showDialog(this, {
        title: this.$t("m.照片示例"),
        imgPath: imgBankCard,
        descArr: [
          this.$t("m.拍摄时请将证件横向平放，且手机横向握持"),
          this.$t("m.请确保身份证全图边框完整，照片内容清晰"),
          this.$t("m.若过于模糊/反光/太暗/缺角会导致识别失败")
        ]
      });
    },
    setBankData(data) {
      this.bankCardData = data;
      this.ifAllowOCR = true;
    },
    handleOCR() {
      this.ifOCRing = true;
      this.$api.ocr
        .bankCard({
          image: this.$dataFormater.spiltBase64(this.bankCardData),
          imageType: "BASE64"
        })
        .then(res => {
          this.ifOCRing = false;
          this.$session.setForm(res.data);
          this.$router.push("/bankCardOCR/success");
        })
        .catch(() => {
          this.$router.push("/bankCardOCR/failure");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
