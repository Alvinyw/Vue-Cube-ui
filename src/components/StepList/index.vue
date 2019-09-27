<template>
  <div class="stepWraper">
    <div class="indexList">
      <div v-for="item in stepCount" :key="item.index" class="step-item">
        <div
          :class="[
          'step-item-bar',
          isApplied(item.index) && 'applied',
          isActive(item.index) && 'active'
        ]"
        >
          <i></i>
        </div>
      </div>
    </div>
    <div class="labelList">
      <span
        v-for="item in stepCount"
        :key="item.index"
        :class="[
          isApplied(item.index) && 'applied',
          isActive(item.index) && 'active']"
      >{{ item.label }}</span>
    </div>
    <div class="lineList">
      <span
        v-for="item in stepCount.filter((val)=>{return val.index > 1})"
        :key="item.index"
        :class="[
          isApplied(item.index) && 'applied',
          isActive(item.index) && 'active']"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "StepList",
  props: {
    activeIndex: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      stepCount: [
        {
          index: 1,
          label: "身份认证"
        },
        {
          index: 2,
          label: "银行卡认证"
        },
        {
          index: 3,
          label: "电子签名"
        },
        {
          index: 4,
          label: "证书申请"
        }
      ]
    };
  },
  watch: {
    activeIndex: {
      handler(newVal, oldVal) {
        if (newVal > this.stepCount) {
          this.$emit("update:activeIndex", oldVal);
        }
      }
    }
  },

  methods: {
    isActive(index) {
      return Number(index) === Number(this.activeIndex);
    },
    isApplied(index) {
      return Number(index) < Number(this.activeIndex);
    }
  }
};
</script>

<style lang="scss" scoped>
.stepWraper {
  position: relative;
  width: 100%;
  height: 98px;
  padding: 9px 60px 0;
  background-color: #fff;
  .indexList {
    box-sizing: border-box;
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: space-between;
    .step-item {
      margin: auto 0;
      position: relative;
      .step-item-bar {
        position: relative;
        z-index: 10;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        text-align: center;
        line-height: 0.4rem;
        font-size: 0.28rem;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        background-color: #fe9893;
        &.applied {
          background-color: #ff665f;
        }
        &.active {
          position: relative;
          width: 36px;
          height: 36px;
          i {
            display: inline-block;
            position: absolute;
            top: 10px;
            left: 9px;
            width: 18px;
            height: 18px;
            background: #ff665f;
            border-radius: 50%;
          }
        }
      }
    }
  }
  .labelList {
    margin: 13px -33px 0 -30px;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 22px;
      color: #999;
      &.applied,
      &.active {
        color: #333;
      }
    }
  }
  .lineList {
    margin: -56px 0 0;
    display: flex;
    justify-content: space-between;
    span {
      flex: 1;
      height: 4px;
      background-color: #ffe2e1;
      &.applied,
      &.active {
        background-color: #ff665f;
      }
    }
  }
}
</style>
