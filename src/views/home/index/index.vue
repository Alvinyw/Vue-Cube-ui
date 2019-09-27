<template>
  <div class="home">
    <TopBar :title="$t('m.Vue-Cube-ui')" :mode="2" />
    <section class="banner">
      <img class="banner_img" src="../../../assets/images/home_banner.png" alt />
    </section>
    <section>
      <h2 class="sec_title">{{$t('m.智能识别')}}</h2>
      <div class="sec_main">
        <Card
          v-for="item in ocrList"
          :key="item.title"
          :title="item.title"
          :desc="item.desc"
          :path="item.path"
          :link="item.link"
          :code="item.code"
        />
      </div>
    </section>
    <section class="content_certification">
      <h2 class="sec_title">{{$t('m.智能认证')}}</h2>
      <div class="sec_main">
        <Card
          v-for="item in certificationList"
          :key="item.title"
          :title="item.title"
          :desc="item.desc"
          :path="item.path"
          :link="item.link"
          :code="item.code"
        />
      </div>
    </section>
    <footer class="footer">
      <i class="line"></i>
      <span>{{$t('m.更多内容请访问')}} https://github.com/Alvinyw/Vue-Cube-ui</span>
      <i class="line"></i>
    </footer>
  </div>
</template>

<script>
import Card from "../components/Card";
import idOcr from "../../../assets/images/id_ocr.png";
import bankOcr from "../../../assets/images/bank_ocr.png";
import idCertification from "../../../assets/images/certification_id.png";
import bankCertification from "../../../assets/images/certification_bank.png";
import peopleCertification from "../../../assets/images/certification_people.png";
import operatorCertification from "../../../assets/images/certification_operator.png";

export default {
  name: "HomePage",
  components: {
    Card
  },
  data() {
    return {};
  },
  computed: {
    ocrList() {
      return [
        {
          title: this.$t("m.身份证OCR"),
          desc: this.$t("m.智能AI高效识别"),
          path: idOcr,
          link: "/IDcardOCR",
          code: 20005
        },
        {
          title: this.$t("m.银行卡OCR"),
          desc: this.$t("m.超高识别准确率"),
          path: bankOcr,
          link: "/bankCardOCR",
          code: 20006
        }
      ];
    },
    certificationList() {
      return [
        {
          title: this.$t("m.运营商认证"),
          desc: this.$t("m.运营商三要素"),
          path: operatorCertification,
          link: "/operatorAuth",
          code: 20002
        },
        {
          title: this.$t("m.人证比对"),
          desc: this.$t("m.权威数据对比"),
          path: peopleCertification,
          link: "/figureContrast",
          code: 20004
        }
      ];
    }
  },
  mounted() {
    this.$session.removeForm();
    this.$session.removeBankCard();
    this.$session.removePDFURL();
    document.title = `${this.$t("m.Vue-Cube-ui")} Demo`;
  }
};
</script>

<style lang="scss" scoped>
.home {
  section {
    background: #fff;
    padding: 40px 30px;
    box-sizing: border-box;
    margin-top: 20px;
  }

  .banner {
    padding-top: 30px;
    min-height: 326px;

    &_img {
      display: block;
      width: 690px;
      height: auto;
      margin: 0 auto;
      border-radius: 16px;
      box-shadow: 0px 4px 20px 0px rgba(36, 3, 80, 0.34);
    }
  }

  .sec_title {
    font-size: 32px;
    position: relative;
    padding-left: 34px;

    &:before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 6px;
      height: 28px;
      background-color: #ff665f;
    }
  }
  .sec_main {
    display: flex;
    flex-wrap: wrap;
    margin-top: 58px;

    div {
      width: 50%;
      padding-left: 30px;
      box-sizing: border-box;
    }
  }
  .sec_server {
    display: flex;
    width: 690px;
    box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    padding: 47px 22px 30px 50px;
    box-sizing: border-box;
    margin: 40px auto 0;
    padding-bottom: 52px;
  }
  .server_left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .title {
      font-size: 40px;
    }
    .desc {
      color: #999999;
      font-size: 24px;
      margin: 10px 0 30px;
    }
    .btn {
      width: auto;
      display: inline-block;
      height: 44px;
      padding: 0;
      padding: 0 18px;
      box-sizing: border-box;
      font-size: 24px;
      line-height: 44px;
      border-radius: 2px;
    }
  }
  .server_img {
    width: 218px;
    height: 159px;
    margin-left: 52px;
  }

  .content {
    &_certification {
      .sec_main {
        div {
          &:first-child {
            margin-bottom: 70px;
          }
          &:nth-child(2) {
            margin-bottom: 70px;
          }
        }
      }
    }
  }

  .footer {
    color: #cccccc;
    font-size: 24px;
    text-align: center;
    line-height: 114px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .line {
      width: 60px;
      height: 1px;
      background-color: #d8d8d8;
    }
  }
}
</style>
