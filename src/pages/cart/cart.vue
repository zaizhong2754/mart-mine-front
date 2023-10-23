<template>
  <view class="mart-cart-page">
    <scroll-view
      scroll-y
      :enhanced="true"
      :show-scrollbar="false"
      class="cart-scroll-view"
      :style="{ height: 'calc(100vh - 104rpx)' }"
    >
      <!-- 购物车 -->
      <view class="cart-goods-list">
        <view class="cart-goods-list-header">
          <view class="cart-goods-list-address">
            <MartRadio :checked="allSelected" @change="allSelectedChange"></MartRadio>
            <text class="cart-goods-list-address-radio-label" @click="allSelectedChange"
              >盒马鲜生</text
            >
          </view>
          <view
            class="cart-goods-list-manage"
            @click="changeManageStatus"
            :style="{ color: isManage ? '#dd524d' : '#007aff' }"
          >
            {{ isManage ? '退出管理' : '管理' }}
          </view>
        </view>

        <view class="cart-goods-list-item" v-for="item in cartList" :key="item.id">
          <view class="cart-goods-list-item-radio">
            <MartRadio :checked="item.checked" @change="selectCartListItem(item.id)"></MartRadio>
          </view>
          <view class="goods-list-item-pic">
            <image
              src="https://img2.baidu.com/it/u=216361273,198906387&fm=253&fmt=auto?w=130&h=170"
              :lazy-load="true"
              :webp="true"
              mode="scaleToFill"
            />
          </view>
          <view class="goods-list-item-info">
            <view class="goods-list-item-desc">{{ item.productDesc }}</view>
            <view class="goods-list-item-tag" v-show="item.tag">
              <text>{{ item.productTag.join('|') }}</text>
            </view>
            <view class="goods-list-item-discount" v-show="item.discount">
              <text>{{ item.productDiscount + '折' }}</text>
            </view>
            <view class="goods-list-item-price">
              <text class="goods-list-item-price-unit">{{ item.priceUnit }}</text>
              <text class="goods-list-item-price-int">{{ item.priceInt }}</text>
              <text class="goods-list-item-price-point" v-show="item.priceFloat > 0">.</text>
              <text class="goods-list-item-price-float" v-show="item.priceFloat > 0">{{
                item.priceFloat
              }}</text>
              <text class="goods-list-item-unit-of-sale">{{ ' / ' + item.productUnitOfSale }}</text>
              <text class="goods-list-item-original-price">
                <text class="goods-list-item-original-price-unit">{{ item.priceUnit }}</text>
                <text class="goods-list-item-original-price-quantity">{{
                  item.originalPrice
                }}</text>
              </text>
            </view>
          </view>
          <view class="goods-list-item-increase-sign">
            <MartGoodsCounter :goods-id="item.id"></MartGoodsCounter>
          </view>
        </view>
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

    <view class="cart-account-column">
      <view class="cart-account-column-left">
        <MartRadio :checked="allSelected" @change="allSelectedChange"></MartRadio>
        <text class="cart-account-column-radio-label" @click="allSelectedChange">全选</text>
      </view>
      <view class="cart-account-column-right" v-if="isManage">
        <button class="cart-account-column-btn cart-account-column-btn-del" disabled>删除</button>
      </view>
      <view class="cart-account-column-right" v-else>
        <view class="cart-account-column-price">
          <text class="cart-account-column-price-text">合计:</text>
          <text class="cart-account-column-price-unit">¥</text>
          <text class="cart-account-column-price-int">6</text>
          <text class="cart-account-column-price-point" v-show="true">.</text>
          <text class="cart-account-column-price-float" v-show="true">5</text>
        </view>
        <button class="cart-account-column-btn" disabled>结算</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const allSelected = ref(false)

const allSelectedChange = () => {
  allSelected.value = !allSelected.value
}

const isManage = ref(false)
const changeManageStatus = () => {
  isManage.value = !isManage.value
}

const dataSource = [
  {
    id: 0,
    top: 0,
    left: 0,
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
  },
  {
    id: 1,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 1,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 2,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 2,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 3,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 3,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 4,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 4,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 5,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 5,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 6,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 6,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 7,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 7,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 8,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 8,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 9,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 9,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  }
]

const dataSourceProcessed = dataSource.map((item) => ({
  ...item,
  checked: false
}))

const cartList = ref(dataSourceProcessed)
const selectCartListItem = (id: number) => {
  cartList.value = cartList.value.map((item) =>
    item.id === id
      ? {
          ...item,
          checked: !item.checked
        }
      : item
  )
}
</script>

<style lang="scss">
page {
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;
}

.mart-cart-page {
  height: 100%;
  padding: 0 24rpx;

  .cart-scroll-view {
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    .cart-goods-list {
      padding: 0 20rpx;
      background-color: #fff;
      border-radius: 12rpx;

      .cart-goods-list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 84rpx;

        .cart-goods-list-address {
          display: flex;
          align-items: center;

          .cart-goods-list-address-radio-label {
            margin-left: 20rpx;
            font-size: 32rpx;
          }
        }
      }

      .cart-goods-list-item {
        position: relative;
        display: flex;
        padding: 16rpx 0;
        overflow: hidden;
        align-items: center;

        .goods-list-item-pic {
          width: 214rpx;
          height: 214rpx;
          margin: 0 16rpx;
          background-color: #ccc;

          image {
            display: block;
            width: 214rpx;
            height: 214rpx;
          }
        }

        .goods-list-item-info {
          .goods-list-item-desc {
            font-size: 26rpx;
            font-weight: 700;
            line-height: 40rpx;
          }

          .goods-list-item-tag {
            margin-top: 6rpx;
            font-size: 20rpx;
            line-height: 40rpx;
            color: #c3a56c;
          }

          .goods-list-item-discount {
            margin-top: 6rpx;

            text {
              font-size: 22rpx;
              color: #f32308;
              border: 1px solid #f32308;
              border-radius: 6rpx;
            }
          }

          .goods-list-item-price {
            margin-top: 10rpx;
            font-size: 24rpx;
            font-weight: 700;
            line-height: 1;
            color: #cf4444;

            .goods-list-item-price-int {
              font-size: 30rpx;
            }

            .goods-list-item-unit-of-sale {
              color: #ccc;
            }

            .goods-list-item-original-price {
              font-weight: 400;
              color: #ccc;
              text-decoration: line-through;
            }
          }
        }

        .goods-list-item-increase-sign {
          position: absolute;
          right: 0;
          bottom: 16rpx;
        }
      }
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

  .cart-account-column {
    position: fixed;
    right: 0;
    left: 0;
    display: flex;
    height: 104rpx;
    padding: 0 24rpx;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;

    .cart-account-column-left {
      display: flex;
      align-items: center;

      .cart-account-column-radio-label {
        margin-left: 20rpx;
        font-size: 32rpx;
      }
    }

    .cart-account-column-right {
      display: flex;
      align-items: center;

      .cart-account-column-price {
        height: 48rpx;
        margin-right: 20rpx;
        font-size: 32rpx;
        font-weight: 700;
        color: #cf4444;

        .cart-account-column-price-text {
          font-size: 28rpx;
          font-weight: 400;
          color: #000;
        }

        .cart-account-column-price-unit {
          margin-right: 8rpx;
        }

        .cart-account-column-price-int {
          font-size: 36rpx;
        }
      }

      .cart-account-column-btn {
        width: 192rpx;
        height: 80rpx;
        font-size: 28rpx;
        font-weight: 700;
        line-height: 80rpx;
        color: #fff;
        text-align: center;
        background-color: #007aff;
        border-radius: 40rpx;
      }

      .cart-account-column-btn-del {
        background-color: #dd524d;
      }

      .cart-account-column-btn[disabled] {
        color: #fff;
        background-color: #ddd;
      }

      .cart-account-column-btn::after {
        border: none;
      }
    }
  }
}
</style>
