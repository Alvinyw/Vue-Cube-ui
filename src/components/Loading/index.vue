<template>
  <div
    class="marsk"
    :class="display"
    @click.stop="()=>{return true}"
  >
    <cube-loading
      :size="size"
      :style="loadingMargin"
    ></cube-loading>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    display: {
      type: String,
      default: 'inline',
    },
    size: {
      type: Number,
      default: 30,
    },
  },
  computed: {
    loadingMargin() {
      const _m = -this.size / 2;
      return 'margin-top:' + _m + 'px;' + 'margin-left:' + _m + 'px';
    },
  },
};
</script>
<style lang="scss" scoped>
.marsk {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #000;
  .cube-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    //margin: -20px 0 0 -20px;
  }
  &.inline {
    position: absolute;
  }
}
</style>
