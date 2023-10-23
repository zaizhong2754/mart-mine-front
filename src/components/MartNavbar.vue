<template>
  <view
    class="mart-navbar"
    :style="{
      width: menuButtonInfo!.left - 20 + 'px',
      height: menuButtonInfo!.height + 'px',
      lineHeight: menuButtonInfo!.height + 'px',
      marginTop: menuButtonInfo!.top + 'px',
      marginBottom: navbarMarginBottom
    }"
  >
    <view class="mart-navbar-address" v-if="showAddress">
      <uni-icons
        class="mart-navbar-address-icon-location"
        type="location"
        size="20"
        color="#000"
      ></uni-icons>
      <text class="mart-navbar-address-text">呼和浩特</text>
      <uni-icons
        class="mart-navbar-address-icon-right"
        type="right"
        size="12"
        color="#000"
      ></uni-icons>
    </view>
    <view
      class="mart-navbar-search"
      :style="{
        borderRadius: menuButtonInfo!.height / 2 + 'px',
        paddingLeft: menuButtonInfo!.height / 2 - 10 + 'px'
      }"
    >
      <uni-icons
        class="mart-navbar-search-icon"
        type="search"
        size="24"
        color="#409eff"
      ></uni-icons>
      <text class="mart-navbar-search-plh">{{ searchPlh }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const menuButtonInfo = uni.getMenuButtonBoundingClientRect()

// 定义 props 接收数据
defineProps<{
  showAddress: boolean
  searchPlh: string
  navbarMarginBottom: string
}>()
</script>

<style lang="scss">
.mart-navbar {
  display: flex;
  // background-color: green;
  .mart-navbar-address {
    display: flex;
    width: 136rpx;
    margin-right: 20rpx;
    font-size: 28rpx;
    font-weight: 700;

    .mart-navbar-address-text {
      overflow: hidden;
      color: #000;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .mart-navbar-search {
    display: flex;
    width: 100%;
    height: 100%;
    border: 1px solid #409eff;
    box-sizing: border-box;

    .mart-navbar-search-plh {
      margin-left: 20rpx;
      font-size: 28rpx;
      color: #c3c3c3;
    }
  }
}
</style>
