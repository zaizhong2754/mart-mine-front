<template>
  <view class="mart-water-fall">
    <view class="water-fall-card" v-for="item in renderList" :key="item.id" :style="item.position">
      <view class="card-product-pic"></view>
      <view class="card-product-info">
        <view class="card-product-desc">{{ item.productDesc }}</view>
        <view class="card-product-tag" v-show="item.tag">
          <text>{{ item.productTag.join('|') }}</text>
        </view>
        <view class="card-product-discount" v-show="item.discount">
          <text>{{ item.productDiscount + '折' }}</text>
        </view>
        <view class="card-product-price">
          <text class="card-product-price-unit">{{ item.priceUnit }}</text>
          <text class="card-product-price-int">{{ item.priceInt }}</text>
          <text class="card-product-price-point" v-show="item.priceFloat > 0">.</text>
          <text class="card-product-price-float" v-show="item.priceFloat > 0">{{
            item.priceFloat
          }}</text>
          <text class="card-product-unit-of-sale">{{ ' / ' + item.productUnitOfSale }}</text>
          <text class="card-product-original-price">
            <text class="card-product-original-price-unit">{{ item.priceUnit }}</text>
            <text class="card-product-original-price-quantity">{{ item.originalPrice }}</text>
          </text>
        </view>
      </view>
      <view class="card-product-cart">
        <uni-icons class="card-product-cart-icon" type="cart" color="#fff"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
import type { ComponentInternalInstance } from 'vue'

// 获取设备像素比dpr
const px2rpx = (px: number) => px / (uni.upx2px(750) / 750)

// 获取设备宽度
const { screenWidth } = uni.getSystemInfoSync()
console.log('screenWidth: ' + screenWidth)
// const px2rpx = (px: number) => (px * 750) / screenWidth

// 模拟瀑布流列表数据
const renderList = ref([
  {
    id: 1,
    position: {},
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 19,
    priceFloat: 8,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 2,
    position: {},
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 1,
    priceUnit: '¥',
    priceInt: 19,
    priceFloat: 8,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: false,
    discount: false
  },
  {
    id: 3,
    position: {},
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 19,
    priceFloat: 8,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 4,
    position: {},
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 1,
    priceUnit: '¥',
    priceInt: 19,
    priceFloat: 8,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: false,
    discount: false
  }
])

onMounted(() => {
  console.log('onMounted')

  // 获取组件实例
  const instance = getCurrentInstance()

  // 瀑布流卡片定位间隙补偿字典(因为rpx被微信小程序换算成px后小数位被丢弃)
  // const widthCompensator = new Map([
  //   [320, 18],
  //   [375, 14],
  //   [414, 18],
  //   [390, 18],
  //   [428, 18],
  //   [430, 18],
  //   [360, 18],
  //   [411, 16],
  //   [412, 18],
  //   [480, 16],
  //   [768, 16],
  //   [834, 16],
  //   [1024, 16]
  // ])

  // const horizontalGap = widthCompensator.get(screenWidth) ?? 18
  const horizontalGap = 14
  // console.log(horizontalGap)

  createWaterfallFull(instance, 344, horizontalGap, horizontalGap)
})

/**
 * 生成瀑布流
 * @param instance 组件实例
 * @param cardWidth 卡片宽度
 * @param horizontalGap 横向间隙
 * @param verticalGap 纵向间隙
 */
const createWaterfallFull = (
  instance: ComponentInternalInstance | null,
  cardWidth: number = 344,
  horizontalGap: number = 14,
  verticalGap: number = 14
) => {
  // 第一行的高度的集合
  const heightsOfFirstLine: number[] = []

  const query = uni.createSelectorQuery().in(instance)
  query
    .selectAll('.water-fall-card')
    .boundingClientRect((res) => {
      // 所有卡片的节点信息
      const resList = Array.from(res as UniApp.NodeInfo[])
      console.log(resList)

      for (let i = 0; i < resList.length; i++) {
        const item = resList[i] as UniApp.NodeInfo
        console.log(item)
        if (i < 2) {
          heightsOfFirstLine.push(Math.ceil(px2rpx(item.height as number)))
          // renderList.value[i].top = 0
          if ((i + 1) % 2 === 1) {
            // renderList.value[i].left = 0
            renderList.value[i].position = {
              top: 0,
              left: 0
            }
          } else {
            // renderList.value[i].left = i * (cardWidth + horizontalGap)
            // console.log('left:' + renderList.value[i].left)
            renderList.value[i].position = {
              top: 0,
              right: 0
            }
          }
        } else {
          console.log(heightsOfFirstLine)
          const minHeight = Math.min(...heightsOfFirstLine)
          // 第一行中最小高度所在下标
          const indexOfMinHeightInFirstLine = heightsOfFirstLine.indexOf(minHeight)
          // console.log(indexOfMinHeightInFirstLine)

          // 当前标签放在高度最小的那一列的下面
          // renderList.value[i].left = indexOfMinHeightInFirstLine * (cardWidth + horizontalGap)
          // renderList.value[i].top = Math.floor(minHeight + verticalGap)

          if ((indexOfMinHeightInFirstLine + 1) % 2 === 1) {
            renderList.value[i].position = {
              top: minHeight + verticalGap + 'rpx',
              left: 0
            }
          } else {
            renderList.value[i].position = {
              top: minHeight + verticalGap + 'rpx',
              right: 0
            }
          }
          // 更新变动列的高度
          heightsOfFirstLine[indexOfMinHeightInFirstLine] += Math.ceil(
            px2rpx(item.height as number) + verticalGap
          )
        }
      }
    })
    .exec()
}
</script>

<style lang="scss">
$container-max-width: 702rpx;
$water-fall-card-gap: 14rpx;
$water-fall-card-border-radius: 14rpx;
$water-fall-card-width: calc(($container-max-width - $water-fall-card-gap) / 2);

.mart-water-fall {
  position: relative;
  width: 100%;

  .water-fall-card {
    position: absolute;
    width: $water-fall-card-width;
    overflow: hidden;
    background-color: #fff;
    border-radius: $water-fall-card-border-radius;

    .card-product-pic {
      width: $water-fall-card-width;
      height: $water-fall-card-width;
      background-color: green;
      border-radius: $water-fall-card-border-radius $water-fall-card-border-radius 0 0;
    }

    .card-product-info {
      padding: 16rpx;

      .card-product-desc {
        font-size: 26rpx;
        font-weight: 700;
        line-height: 40rpx;
      }

      .card-product-tag {
        margin-top: 6rpx;
        font-size: 24rpx;
        line-height: 40rpx;
        color: #c3a56c;
      }

      .card-product-discount {
        margin-top: 6rpx;

        text {
          font-size: 22rpx;
          color: #f32308;
          border: 1px solid #f32308;
          border-radius: 6rpx;
        }
      }

      .card-product-price {
        margin-top: 10rpx;
        font-size: 24rpx;
        font-weight: 700;
        line-height: 1;
        color: #cf4444;

        .card-product-price-int {
          font-size: 30rpx;
        }

        .card-product-unit-of-sale {
          color: #ccc;
        }

        .card-product-original-price {
          font-weight: 400;
          color: #ccc;
          text-decoration: line-through;
        }
      }
    }

    .card-product-cart {
      position: absolute;
      right: 16rpx;
      bottom: 16rpx;
      width: 48rpx;
      height: 48rpx;
      background-color: #007aff;
      border-radius: 50%;

      .card-product-cart-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 48rpx;
        height: 48rpx;

        text {
          width: 48rpx;
          height: 48rpx;
          font-size: 40rpx !important;
          line-height: 48rpx;
          align-items: center;
        }
      }
    }
  }
}
</style>
