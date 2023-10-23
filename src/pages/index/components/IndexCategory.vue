<template>
  <view
    class="category"
    :style="{
      marginTop: categoryMarginTop,
      marginBottom: categoryMarginBottom
    }"
  >
    <navigator
      class="category-item"
      hover-class="none"
      url="/pages/index/index"
      v-for="item in list"
      :key="item.id"
    >
      <image class="category-item-image" :src="item.icon"></image>
      <text class="category-item-text">{{ item.name }}</text>
    </navigator>
  </view>
</template>

<script setup lang="ts">
import type { CategoryItem } from '@/types/home'

// 定义 props 接收数据
defineProps<{
  list: CategoryItem[]
  categoryMarginTop: string
  categoryMarginBottom: string
}>()
</script>

<style lang="scss">
.category {
  display: flex;
  min-height: 328rpx;
  background-color: #fff;
  border-radius: 12rpx;
  flex-wrap: wrap;

  .category-item {
    display: flex;
    width: 20%;
    box-sizing: border-box;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .category-item-image {
      width: 100rpx;
      height: 100rpx;
      background-color: #ccc;
      border-radius: 50%;
    }

    .category-item-text {
      margin-top: 4rpx;
      font-size: 26rpx;
    }
  }
}
</style>
