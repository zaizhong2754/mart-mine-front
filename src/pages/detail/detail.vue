<template>
  <view class="mart-detail-page">
    <scroll-view scroll-y :enhanced="true" :show-scrollbar="false" class="detail-scroll-view">
      <view class="detail-goods-image">
        <MartSwiper :list="bannerList" :bannerHeight="'750rpx'" :indicatorType="'num'" />
      </view>

      <view class="detail-goods-info">
        <view class="detail-goods-price">
          <text class="detail-goods-price-unit">{{ goodsInfo.priceUnit }}</text>
          <text class="detail-goods-price-int">{{ goodsInfo.priceInt }}</text>
          <text class="detail-goods-price-point" v-show="goodsInfo.priceFloat > 0">.</text>
          <text class="detail-goods-price-float" v-show="goodsInfo.priceFloat > 0"
            >{{ goodsInfo.priceFloat }}
          </text>
        </view>
        <view class="detail-goods-into-cart">
          <view class="detail-goods-desc">{{ goodsInfo.productDesc }}</view>
          <button class="detail-goods-btn">+ 加入购物车</button>
        </view>
      </view>
      <view class="detail-goods-other">
        <view class="detail-goods-other-header">商品详情</view>
        <view class="detail-goods-other-body">
          <view class="detail-goods-other-body-item detail-goods-original-price">
            <text class="detail-goods-other-body-left">原价</text>
            <text class="detail-goods-other-body-right">{{
              goodsInfo.priceUnit + goodsInfo.originalPrice
            }}</text>
          </view>
          <view class="detail-goods-other-body-item detail-goods-price-unit">
            <text class="detail-goods-other-body-left">单位</text>
            <text class="detail-goods-other-body-right">份</text>
          </view>
          <view class="detail-goods-other-body-item detail-goods-price-specification">
            <text class="detail-goods-other-body-left">规格</text>
            <text class="detail-goods-other-body-right">500 ml</text>
          </view>
          <view class="detail-goods-other-body-item detail-goods-tag" v-show="goodsInfo.tag">
            <text class="detail-goods-other-body-left">特点</text>
            <text class="detail-goods-other-body-right">{{ goodsInfo.productTag.join(' ') }}</text>
          </view>
          <view
            class="detail-goods-other-body-item detail-goods-discount"
            v-show="goodsInfo.discount"
          >
            <text class="detail-goods-other-body-left">折扣</text>
            <text class="detail-goods-other-body-right">{{
              goodsInfo.productDiscount + '折'
            }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { BannerItem } from '@/types/components'

// 获取轮播图数据
const bannerList = ref<BannerItem[]>([])
bannerList.value = [
  {
    id: '1',
    imgUrl: ''
  },
  {
    id: '2',
    imgUrl: ''
  },
  {
    id: '3',
    imgUrl: ''
  },
  {
    id: '4',
    imgUrl: ''
  },
  {
    id: '5',
    imgUrl: ''
  },
  {
    id: '6',
    imgUrl: ''
  },
  {
    id: '7',
    imgUrl: ''
  }
] as unknown as BannerItem[]

// 商品
const goodsInfo = {
  id: 0,
  productDesc: '盒马 深层玄武岩天然水 500ml*12',
  productTag: ['纯天然', '口感清甜'],
  productDiscount: 7.5,
  priceUnit: '¥',
  priceInt: 0,
  priceFloat: 1,
  productUnitOfSale: '罐',
  originalPrice: 21.5,
  tag: true,
  discount: true
}
</script>

<style lang="scss">
page {
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;
}

.mart-detail-page {
  height: 100%;

  .detail-scroll-view {
    height: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    .detail-goods-image {
      width: 750rpx;
      height: 750rpx;
      background-color: #ccc;
    }

    .detail-goods-info {
      padding: 0 24rpx;
      margin-bottom: 24rpx;
      background-color: #fff;

      .detail-goods-price {
        padding: 28rpx 0;
        font-size: 40rpx;
        font-weight: 700;
        line-height: 1;
        color: #cf4444;

        .detail-goods-price-int {
          font-size: 48rpx;
        }

        .detail-goods-price-unit-of-sale {
          color: #ccc;
        }

        .detail-goods-price-original-price {
          font-weight: 400;
          color: #ccc;
          text-decoration: line-through;
        }
      }

      .detail-goods-into-cart {
        display: flex;
        height: 128rpx;
        justify-content: space-between;

        .detail-goods-desc {
          width: 464rpx;
          font-size: 32rpx;
          font-weight: 700;
        }

        .detail-goods-btn {
          width: 192rpx;
          height: 60rpx;
          padding: 0;
          margin: 0;
          font-size: 28rpx;
          font-weight: 700;
          line-height: 60rpx;
          color: #fff;
          text-align: center;
          background-color: #007aff;
        }
      }
    }

    .detail-goods-other {
      padding: 0 24rpx;

      .detail-goods-other-header {
        font-size: 32rpx;
        font-weight: 700;
      }

      .detail-goods-other-body {
        padding-left: 72rpx;
        font-size: 28rpx;

        .detail-goods-other-body-item {
          padding: 28rpx 0;
        }

        .detail-goods-other-body-left {
          margin-right: 20rpx;
          color: #ccc;
        }

        .detail-goods-other-body-right {
          color: #000;
        }
      }
    }
  }
}
</style>
