<template>
  <div class="auth">
    <TopBar :title="$t('m.运营商认证')" :mode="3" />
    <cube-form class="form" :model="model" @validate="validateHandler" @submit="submitHandler">
      <cube-form-group class="auth-group">
        <cube-form-item v-for="(item, index) in fields" :key="index" :field="item" />
      </cube-form-group>
      <cube-form-group>
        <cube-button v-waves type="submit" :disabled="isDisabled" class="auth-btn">
          {{$t('m.点击认证')}}
          <Loading v-show="loading" />
        </cube-button>
      </cube-form-group>
    </cube-form>
  </div>
</template>

<script>
import { getForm, setForm } from "@/utils/session";

export default {
  name: "Index",
  data() {
    return {
      loading: false,
      validity: {},
      valid: undefined,
      model: {
        name: "",
        mobile: "",
        idNum: ""
      }
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
          modelKey: "mobile",
          label: this.$t("m.手机号"),
          props: {
            placeholder: this.$t("m.请输入手机号")
          },
          rules: {
            required: true,
            notWhitespace: false
          },
          messages: {
            type: this.$t("m.请输入有效的手机号")
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
          },
          messages: {
            type: this.$t("m.请输入有效的身份证号")
          }
        }
      ];
    }
  },
  methods: {
    async operateAuth() {
      try {
        this.loading = true;
        const resp = await this.$api.auth.operateAuth({
          name: this.model.name.trim(),
          mobile: this.model.mobile.trim(),
          idNum: this.model.idNum.trim()
        });
        this.loading = false;
        return Number(resp.code) === 200000 && resp.data.result === "01";
      } catch (error) {
        return false;
      }
    },
    async submitHandler(event) {
      event.preventDefault();
      setForm(this.model);
      const result = await this.operateAuth();
      let code = result ? 1 : 0;

      this.$router.push({
        path: "/operatorAuth/result",
        query: {
          result: code
        }
      });
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
    }
  },
  mounted() {
    if (getForm()) {
      this.model = getForm();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/auth.scss";
</style>
