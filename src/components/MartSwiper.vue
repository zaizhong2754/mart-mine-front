<template>
  <view
    class="mart-swiper"
    :style="{
      width: bannerWidth,
      height: bannerHeight,
      borderRadius: bannerBorderRadius,
      marginTop: bannerMarginTop
    }"
  >
    <swiper
      class="mart-swiper-box"
      :circular="true"
      :autoplay="true"
      :interval="2000"
      @change="onChange"
    >
      <swiper-item class="mart-swiper-item" v-for="item in list" :key="item.id">
        <navigator url="/pages/index/index" hover-class="none" class="mart-swiper-item-navigator">
          <image mode="aspectFill" class="mart-swiper-item-image" :src="item.imgUrl"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- (点)指示器 -->
    <view class="mart-swiper-dot-indicator" v-if="indicatorType === 'dot'">
      <text
        v-for="(item, index) in list"
        :key="item.id"
        class="dot"
        :class="{ active: index === activeIndex }"
      ></text>
    </view>
    <!-- (值)指示值 -->
    <view class="mart-swiper-num-indicator" v-else>
      <text>{{ activeIndex + 1 }}</text>
      <text>/</text>
      <text>{{ list.length }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { BannerItem } from '@/types/components'
import { ref } from 'vue'

const activeIndex = ref(0)

// 当 swiper 下标发生变化时触发
const onChange: UniHelper.SwiperOnChange = (ev) => {
  activeIndex.value = ev.detail.current
}
// 定义 props 接收
withDefaults(
  defineProps<{
    list: BannerItem[]
    bannerWidth?: string
    bannerHeight?: string
    bannerBorderRadius?: string
    bannerMarginTop?: string
    indicatorType?: string
  }>(),
  {
    bannerWidth: '100%',
    bannerHeight: '226rpx',
    bannerBorderRadius: '0',
    bannerMarginTop: '0',
    indicatorType: 'dot'
  }
)
</script>

<style lang="scss">
.mart-swiper {
  position: relative;
  overflow: hidden;
  // background-color: #efefef;
  background-color: #000;

  .mart-swiper-dot-indicator {
    position: absolute;
    right: 0;
    bottom: 18rpx;
    left: 0;
    display: flex;
    justify-content: center;

    .dot {
      width: 6rpx;
      height: 6rpx;
      margin: 0 12rpx;
      // background-color: #000;
      background-color: rgb(255 255 255 / 40%);
      border-radius: 3rpx;
    }

    .active {
      width: 16rpx;
      background-color: #fff;
    }
  }

  .mart-swiper-num-indicator {
    position: absolute;
    right: 8rpx;
    bottom: 8rpx;
    width: 56rpx;
    height: 32rpx;
    font-size: 20rpx;
    line-height: 32rpx;
    color: #fff;
    text-align: center;
    background-color: #ddd;
    border-radius: 8rpx;
  }

  .mart-swiper-box,
  .mart-swiper-item-navigator,
  .mart-swiper-item-image {
    width: 100%;
    height: 100%;
  }
}
</style>
