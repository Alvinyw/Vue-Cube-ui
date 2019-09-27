<template>
  <div class="auth-result">
    <img class="img" :src="imgSrc" alt />
    <h4 class="title">{{title}}</h4>
    <p class="desc">{{desc}}</p>
  </div>
</template>
<script>
export default {
  name: "Result",
  props: {
    title: String,
    desc: String,
    imgSrc: String
  }
};
</script>
<style lang="scss" scoped>
.auth-result {
  padding: 100px 84px;
  text-align: center;
  background-color: #ffffff;

  .img {
    display: block;
    width: 124px;
    height: auto;
    min-height: 124px;
    margin: 0 auto;
  }
  .title {
    font-size: 40px;
    margin: 34px 0 26px;
  }
  .desc {
    color: #666666;
    font-size: 28px;
    line-height: 46px;
  }
}
</style>
