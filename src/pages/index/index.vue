<template>
  <view class="mart-home-page">
    <!-- 自定义导航栏 -->
    <MartNavbar :navbarMarginBottom="'12rpx'" :showAddress="true" :searchPlh="'搜索附近门店'" />
    <!-- 滚动容器 -->
    <scroll-view
      scroll-y
      :enhanced="true"
      :show-scrollbar="false"
      class="home-scroll-view"
      :style="{ height: scrollViewHeight + 'px' }"
    >
      <!-- 轮播图 -->
      <view class="swiper-banner">
        <MartSwiper :list="bannerList" :bannerBorderRadius="'12rpx'" :bannerMarginTop="'24rpx'" />
      </view>
      <!-- 通告栏 -->
      <view class="notice-banner">
        <IndexNotice :notice="notice" :noticeMarginTop="'24rpx'" />
      </view>
      <!-- 商品分类 -->
      <view class="category-banner">
        <IndexCategory
          :list="categoryList"
          :categoryMarginTop="'24rpx'"
          :categoryMarginBottom="'24rpx'"
        />
      </view>
      <!-- 瀑布流 -->
      <view class="water-fall-header">
        <text>— —</text>
        <text>推荐</text>
        <text>— —</text>
      </view>
      <view class="water-fall">
        <MartWaterFall />
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import IndexNotice from './components/IndexNotice.vue'
import IndexCategory from './components/IndexCategory.vue'
import { ref } from 'vue'
import type { BannerItem } from '@/types/components'
import type { CategoryItem } from '@/types/home'
import useScrollWhoFullOfVerticalSpace from '@/hooks/useScrollWhoFullOfVerticalSpace'

// 设置滚动区的高度
const scrollViewHeight = useScrollWhoFullOfVerticalSpace('.home-scroll-view')

// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
bannerList.value = [
  {
    herfUrl: '',
    id: '1',
    imgUrl: '',
    type: 0
  },
  {
    herfUrl: '',
    id: '2',
    imgUrl: '',
    type: 0
  },
  {
    herfUrl: '',
    id: '3',
    imgUrl: '',
    type: 0
  },
  {
    herfUrl: '',
    id: '4',
    imgUrl: '',
    type: 0
  },
  {
    herfUrl: '',
    id: '5',
    imgUrl: '',
    type: 0
  },
  {
    herfUrl: '',
    id: '6',
    imgUrl: '',
    type: 0
  },
  {
    herfUrl: '',
    id: '7',
    imgUrl: '',
    type: 0
  }
] as unknown as BannerItem[]

// 获取通告栏信息
const notice = ref('')
notice.value = 'fdafsafadsfafasfsafdaffsddsaaaaaaaaaaaaaaaaaaaa'

const categoryList = ref<CategoryItem[]>([])
categoryList.value = [
  {
    icon: '',
    id: '1',
    name: '1'
  },
  {
    icon: '',
    id: '2',
    name: '2'
  },
  {
    icon: '',
    id: '3',
    name: '3'
  },
  {
    icon: '',
    id: '4',
    name: '4'
  },
  {
    icon: '',
    id: '5',
    name: '5'
  },
  {
    icon: '',
    id: '6',
    name: '6'
  },
  {
    icon: '',
    id: '7',
    name: '7'
  },
  {
    icon: '',
    id: '8',
    name: '8'
  },
  {
    icon: '',
    id: '9',
    name: '9'
  },
  {
    icon: '',
    id: '10',
    name: '10'
  }
]
</script>

<style lang="scss">
page {
  // background-color: #000;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;
}

.mart-home-page {
  height: 100%;
  // display: flex;
  // flex-direction: column;
  padding: 0 24rpx;

  .home-scroll-view {
    // flex: 1;
    // overflow: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    .water-fall-header {
      display: flex;
      height: 76rpx;
      padding: 0 120rpx;
      font-weight: 700;
      color: #333;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
