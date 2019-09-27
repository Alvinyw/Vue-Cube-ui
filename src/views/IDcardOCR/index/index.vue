<template>
  <div id="IDcardOCR_index">
    <TopBar :title="$t('m.身份证OCR')" :mode="3" />
    <div class="container">
      <div class="id_face">
        <cameras-albums
          fileInputID="id_face"
          :click-image-src="require('@/assets/images/id_face.svg')"
          :click-text="`${$t('m.点击上传')}<span style='color: #ff665f;'>${$t('m.人像面')}</span>`"
          @clickSample="IDcardFrontSample"
          @setData="setImgIDFront"
        ></cameras-albums>
      </div>
      <div class="id_nationalEmblem">
        <cameras-albums
          fileInputID="id_nationalEmblem"
          :click-image-src="require('@/assets/images/id_nationalEmblem.svg')"
          :click-text="`${$t('m.点击上传')}<span style='color: #ff665f;'>${$t('m.国徽面')}</span>`"
          @clickSample="IDcardBackSample"
          @setData="setImgIDBack"
        ></cameras-albums>
      </div>
      <safety-tips></safety-tips>
      <cube-button
        v-waves
        :primary="true"
        class="mt80"
        @click="handleOCR"
        :disabled="!ifAllowOCR"
      >{{$t('m.点击识别')}}</cube-button>
      <Loading v-show="ifOCRing" display="block" />
    </div>
  </div>
</template>
<script>
import { showDialog } from "@/utils/dialogConfig";
import CamerasAlbums from "@/components/CamerasAlbums";
import IDcardFront from "@/assets/images/id_idCard_face.png";
import IDcardBack from "@/assets/images/id_idCard_em.png";
import SafetyTips from "@/components/SafetyTips";

export default {
  name: "Index",
  components: {
    CamerasAlbums,
    SafetyTips
  },
  data() {
    return {
      ifAllowOCR: false, // 是否允许 OCR
      ifOCRing: false, // 是否正在识别
      formData: {}, // OCR 出来的结果
      imgIDFront: "", // 身份证正面图片 base64 数据
      imgIDBack: "" // 身份证背面图片 base64 数据
    };
  },
  methods: {
    IDcardFrontSample() {
      showDialog(this, {
        title: this.$t("m.照片示例"),
        imgPath: IDcardFront,
        descArr: [
          this.$t("m.拍摄时请将证件横向平放，且手机横向握持"),
          this.$t("m.请确保身份证全图边框完整，照片内容清晰"),
          this.$t("m.若过于模糊/反光/太暗/缺角会导致识别失败")
        ]
      });
    },
    IDcardBackSample() {
      showDialog(this, {
        title: this.$t("m.照片示例"),
        imgPath: IDcardBack,
        descArr: [
          this.$t("m.拍摄时请将证件横向平放，且手机横向握持"),
          this.$t("m.请确保身份证全图边框完整，照片内容清晰"),
          this.$t("m.若过于模糊/反光/太暗/缺角会导致识别失败")
        ]
      });
    },
    setImgIDFront(data) {
      this.imgIDFront = data;
      this.ifAllowOCR = true;
    },
    setImgIDBack(data) {
      this.imgIDBack = data;
      this.ifAllowOCR = true;
    },
    IDcardOCR(BASE64, type) {
      // type: 0-正面  1-背面
      this.ifOCRing = true;
      return this.$api.ocr
        .IDcard({
          image: this.$dataFormater.spiltBase64(BASE64),
          imageType: "BASE64",
          ocrType: type
        })
        .then(res => {
          this.ifOCRing = false;
          Object.assign(this.formData, res.data);
        });
    },
    async handleOCR() {
      try {
        if (this.imgIDFront) {
          await this.IDcardOCR(this.imgIDFront, 0);
        }
        if (this.imgIDBack) {
          await this.IDcardOCR(this.imgIDBack, 1);
        }
        this.$session.setForm(this.formData);
        this.$router.push("/IDcardOCR/success");
      } catch (e) {
        this.$router.push("/IDcardOCR/failure");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#IDcardOCR_index {
  .id_nationalEmblem {
    margin-top: 30px;
  }
}
</style>
