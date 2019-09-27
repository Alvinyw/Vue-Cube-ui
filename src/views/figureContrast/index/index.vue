<template>
  <div id="figureContrast_index" class="auth">
    <TopBar :title="$t('m.人证比对')" :mode="3" />
    <cube-form class="form" :model="model" @validate="validateHandler">
      <cube-form-group class="auth-group">
        <cube-form-item v-for="(item, index) in fields" :key="index" :field="item" />
      </cube-form-group>
    </cube-form>
    <div class="container">
      <h3 class="face_title">{{ $t('m.人脸照') }}</h3>
      <cameras-albums
        :click-image-src="require('@/assets/images/img_figureContrast_clickUp.svg')"
        :click-text="$t('m.点击上传清晰正面人脸照片')"
        :max-size="100/1024"
        @clickSample="faceSample"
        @setData="setFacePic"
      ></cameras-albums>
      <cube-button
        v-waves
        :primary="true"
        class="mt80"
        @click="handleOCR"
        :disabled="!ifAllowOCR || isDisabled"
      >{{ $t('m.点击认证') }}</cube-button>
      <Loading v-show="ifOCRing" display="block" />
    </div>
  </div>
</template>

<script>
import { showDialog } from "@/utils/dialogConfig";
import imgSample from "@/assets/images/img_figureContrast_sample.png";

export default {
  name: "Index",
  data() {
    return {
      ifAllowOCR: false, // 是否允许 OCR
      ifOCRing: false, // 是否正在识别
      valid: undefined,
      model: {
        name: "",
        idNum: ""
      },
      facePic: ""
    };
  },
  computed: {
    isDisabled() {
      return this.valid === undefined || !this.valid;
    },
    fields() {
      return [
        {
          type: "input",
          modelKey: "name",
          label: this.$t("m.姓名"),
          props: {
            placeholder: this.$t("m.请输入姓名")
          },
          rules: {
            required: true,
            notWhitespace: false
          }
        },
        {
          type: "input",
          modelKey: "idNum",
          label: this.$t("m.身份证号"),
          props: {
            placeholder: this.$t("m.请输入身份证号")
          },
          rules: {
            required: true,
            notWhitespace: false
          }
        }
      ];
    }
  },
  mounted() {
    const _curFormData = this.$session.getForm();
    this.model.name = _curFormData.name;
    this.model.idNum = _curFormData.idNum;
  },
  methods: {
    faceSample() {
      showDialog(this, {
        title: this.$t("m.照片示例"),
        imgPath: imgSample,
        descArr: [
          this.$t("m.五官清晰露出无遮挡"),
          this.$t("m.光线均匀分布，无较大暗面/反光"),
          this.$t("m.正面角度平视照片，表情正常"),
          this.$t("m.请上传无美颜修图的原始照片")
        ]
      });
    },
    setFacePic(data) {
      this.facePic = this.$dataFormater.spiltBase64(data);
      this.ifAllowOCR = true;
    },
    validateHandler(result) {
      this.valid = result.valid;
    },
    handleOCR() {
      this.ifOCRing = true;
      this.$session.setForm(this.model);
      this.model.facePic = this.facePic;
      this.$api.auth
        .faceAuth(this.model)
        .then(res => {
          this.ifOCRing = false;
          if (res.data && res.data.result == "01") {
            this.$router.push({
              path: "/figureContrast/result",
              query: {
                result: 1
              }
            });
          } else {
            this.$router.push({
              path: "/figureContrast/result",
              query: {
                result: 0
              }
            });
          }
        })
        .catch(() => {
          this.ifOCRing = false;
          this.$router.push({
            path: "/figureContrast/result",
            query: {
              result: 0
            }
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#figureContrast_index {
  .face_title {
    font-size: 28px;
    color: #333;
    margin: 20px 0;
  }
}
</style>
