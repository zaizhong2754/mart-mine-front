<template>
  <view
    class="notice"
    :style="{
      marginTop: noticeMarginTop
    }"
  >
    <view class="notice-icon">公告</view>
    <uni-notice-bar
      class="notice-content"
      scrollable
      :text="notice"
      color="#409eff"
      background-color="#fff"
    />
  </view>
</template>

<script lang="ts">
export default {
  options: {
    styleIsolation: 'shared' // 解除样式隔离
  }
}
</script>

<script setup lang="ts">
import { ref } from 'vue'

// 定义 props 接收
defineProps<{
  notice: string
  noticeMarginTop: string
}>()
</script>

<style lang="scss">
.notice {
  display: flex;
  height: 78rpx;
  background-color: #fff;
  border-radius: 12rpx;

  .notice-icon {
    width: 102rpx;
    margin: 20rpx 18rpx;
    font-size: 28rpx;
    line-height: 38rpx;
    color: #fff;
    text-align: center;
    background-color: #409eff;
    border-radius: 8rpx;
  }

  .notice-content {
    width: 100%;
    height: 100%;

    .uni-noticebar {
      height: 78rpx;
      padding-left: 0;
      margin-bottom: 0;
      border-radius: 0 12rpx 12rpx 0;
    }
  }
}
</style>
