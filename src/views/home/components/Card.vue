<template>
  <div
    class="card"
    @click="goPage"
  >
    <img
      class="card_img"
      :src="path"
      alt
    />
    <div>
      <h4 class="card_title">{{title}}</h4>
      <p class="card_desc">{{desc}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Card',
  props: {
    path: String,
    title: String,
    desc: String,
    link: String,
    code: Number,
  },
  methods: {
    goPage() {
      this.$router.push(this.link);
      this.$session.setProductCode(this.code);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;

  &_img {
    width: 64px;
    height: 64px;
    margin-right: 23px;
  }
  &_title {
    font-size: 28px;
    margin-bottom: 12px;
  }
  &_desc {
    color: #999999;
    font-size: 24px;
  }
}
</style>
