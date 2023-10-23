<template>
  <view class="mart-category-page">
    <!-- 自定义导航栏 -->
    <view class="category-search">
      <MartNavbar :navbarMarginBottom="'12rpx'" :showAddress="false" :searchPlh="'搜索门店商品'" />
    </view>
    <!-- 店铺信息 -->
    <view class="category-store-info">
      <view class="category-store-name">
        <text class="category-store-name-info">新洲一中店</text>
        <uni-icons
          class="category-store-name-icon-right"
          type="right"
          size="18"
          color="#000"
        ></uni-icons>
      </view>
      <view class="category-store-address">
        <view class="category-store-address-info">武汉市新洲区邾城街邾城大街221号</view>
        <view class="category-store-address-distance">
          <view class="category-store-address-distance-level">距您 {{ '>20km' }}</view>
          <view :class="'category-store-address-status-' + status">{{
            status === 'local' ? '附近' : '异地'
          }}</view>
        </view>
      </view>
    </view>
    <!-- 商品分类列表 -->
    <view class="category-goods-list" :style="{ height: scrollViewHeight + 'px' }">
      <!-- 商品大类 -->
      <scroll-view
        scroll-y
        :enhanced="true"
        :show-scrollbar="false"
        class="category-goods-list-major"
      >
        <view class="category-goods-list-major-item" v-for="item in majorList" :key="item.id">
          <view
            class="category-goods-list-major-item-checked"
            v-show="item.id === currentMajor"
          ></view>
          <view class="category-goods-list-major-item-info">
            <uni-icons
              class="category-goods-list-major-item-icon"
              :type="item.icon"
              size="32"
              :color="item.id === currentMajor ? 'orangered' : '#c3c3c3'"
            ></uni-icons>
            <view
              class="category-goods-list-major-item-name"
              :style="{ color: item.id === currentMajor ? '#3982ee' : '#c3c3c3' }"
            >
              {{ item.name }}
            </view>
          </view>
        </view>
      </scroll-view>

      <view
        class="category-goods-list-fixed-outer"
        :style="{
          visibility: showFixedOut ? 'visible' : 'hidden',
          zIndex: showFixedOut ? 999 : 888
        }"
      >
        <scroll-view
          scroll-x
          enable-flex
          :enhanced="true"
          :show-scrollbar="false"
          class="category-goods-list-minor"
        >
          <view class="category-goods-list-minor-item"> 全部 </view>
          <view class="category-goods-list-minor-item">新疆瓜果</view>
          <view class="category-goods-list-minor-item">蜜瓜西瓜</view>
          <view class="category-goods-list-minor-item">蜜瓜西瓜</view>
          <view class="category-goods-list-minor-item">蜜瓜西瓜</view>
          <view class="category-goods-list-minor-item">蜜瓜西瓜</view>
          <view class="category-goods-list-minor-item">蜜瓜西瓜</view>
          <view class="category-goods-list-minor-item">蜜瓜西瓜</view>
          <view class="category-goods-list-minor-item">蜜瓜西瓜</view>
        </scroll-view>
        <view class="category-goods-list-arrow" @click="showPanel = !showPanel">
          <uni-icons :type="showPanel ? 'top' : 'bottom'" color="#000" size="24"></uni-icons>
        </view>
        <view
          class="category-goods-list-panel"
          :style="{
            visibility: showPanel && showFixedOut ? 'visible' : 'hidden',
            zIndex: showFixedOut ? 999 : 888
          }"
          >222</view
        >
        <view class="category-goods-list-goods-goods-order-by">
          <view class="category-goods-list-goods-goods-order-by-price" @click="changeOrderWay(1)">
            <text :style="{ color: Math.abs(goodsOrderBy) === 1 ? '#007aff' : '#333' }">价格</text>
            <view class="category-goods-list-goods-goods-order-by-price-icon">
              <uni-icons
                type="top"
                size="8"
                :color="goodsOrderBy === 1 ? '#007aff' : '#333'"
              ></uni-icons>
              <uni-icons
                type="bottom"
                size="8"
                :color="goodsOrderBy === -1 ? '#007aff' : '#333'"
              ></uni-icons>
            </view>
          </view>
          <view
            class="category-goods-list-goods-goods-order-by-sale"
            :style="{ color: goodsOrderBy === 2 ? '#007aff' : '#333' }"
            @click="changeOrderWay(2)"
            >销量</view
          >
        </view>
      </view>

      <scroll-view
        :scroll-y="true"
        :enhanced="true"
        :show-scrollbar="true"
        :scroll-anchoring="true"
        class="category-goods-list-right"
        :style="{
          height: goodsScrollViewHeight + 'px'
        }"
        @scroll="listScroll"
      >
        <view
          :style="{
            height: topBlankFill + 'px'
          }"
        ></view>
        <!-- 商品小类 -->
        <view
          class="category-goods-list-banner"
          :style="{
            visibility: showFixedOut ? 'hidden' : 'visible',
            zIndex: showFixedOut ? 888 : 999
          }"
        >
          <image
            src="https://img1.baidu.com/it/u=2328766673,3584364392&fm=253&fmt=auto?w=130&h=170"
            mode="scaleToFill"
          />
        </view>

        <view
          class="category-goods-list-fixed-inner"
          :style="{
            visibility: showFixedOut ? 'hidden' : 'visible',
            zIndex: showFixedOut ? 888 : 999
          }"
        >
          <scroll-view
            scroll-x
            enable-flex
            :enhanced="true"
            :show-scrollbar="false"
            class="category-goods-list-minor"
          >
            <view class="category-goods-list-minor-item"> 全部 </view>
            <view class="category-goods-list-minor-item">新疆瓜果</view>
            <view class="category-goods-list-minor-item">蜜瓜西瓜</view>
            <view class="category-goods-list-minor-item">蜜瓜西瓜</view>
            <view class="category-goods-list-minor-item">蜜瓜西瓜</view>
            <view class="category-goods-list-minor-item">蜜瓜西瓜</view>
            <view class="category-goods-list-minor-item">蜜瓜西瓜</view>
            <view class="category-goods-list-minor-item">蜜瓜西瓜</view>
            <view class="category-goods-list-minor-item">蜜瓜西瓜</view>
          </scroll-view>
          <view class="category-goods-list-arrow" @click="showPanel = !showPanel">
            <uni-icons :type="showPanel ? 'top' : 'bottom'" color="#000" size="24"></uni-icons>
          </view>
          <view
            class="category-goods-list-panel"
            :style="{ visibility: showPanel ? 'visible' : 'hidden' }"
            >222</view
          >
          <view class="category-goods-list-goods-goods-order-by">
            <view class="category-goods-list-goods-goods-order-by-price" @click="changeOrderWay(1)">
              <text :style="{ color: Math.abs(goodsOrderBy) === 1 ? '#007aff' : '#333' }"
                >价格</text
              >
              <view class="category-goods-list-goods-goods-order-by-price-icon">
                <uni-icons
                  type="top"
                  size="8"
                  :color="goodsOrderBy === 1 ? '#007aff' : '#333'"
                ></uni-icons>
                <uni-icons
                  type="bottom"
                  size="8"
                  :color="goodsOrderBy === -1 ? '#007aff' : '#333'"
                ></uni-icons>
              </view>
            </view>
            <view
              class="category-goods-list-goods-goods-order-by-sale"
              :style="{ color: goodsOrderBy === 2 ? '#007aff' : '#333' }"
              @click="changeOrderWay(2)"
              >销量</view
            >
          </view>
        </view>

        <view class="category-goods-list-goods">
          <view class="category-goods-list-goods-item" v-for="item in showGoodsList" :key="item.id">
            <view class="goods-item-pic">
              <image
                src="https://img2.baidu.com/it/u=216361273,198906387&fm=253&fmt=auto?w=130&h=170"
                :lazy-load="true"
                :webp="true"
                mode="scaleToFill"
              />
            </view>
            <view class="goods-item-info">
              <view class="goods-item-desc">{{ item.productDesc }}</view>
              <view class="goods-item-tag" v-show="item.tag">
                <text>{{ item.productTag.join('|') }}</text>
              </view>
              <view class="goods-item-discount" v-show="item.discount">
                <text>{{ item.productDiscount + '折' }}</text>
              </view>
              <view class="goods-item-price">
                <text class="goods-item-price-unit">{{ item.priceUnit }}</text>
                <text class="goods-item-price-int">{{ item.priceInt }}</text>
                <text class="goods-item-price-point" v-show="item.priceFloat > 0">.</text>
                <text class="goods-item-price-float" v-show="item.priceFloat > 0">{{
                  item.priceFloat
                }}</text>
                <text class="goods-item-unit-of-sale">{{ ' / ' + item.productUnitOfSale }}</text>
                <text class="goods-item-original-price">
                  <text class="goods-item-original-price-unit">{{ item.priceUnit }}</text>
                  <text class="goods-item-original-price-quantity">{{ item.originalPrice }}</text>
                </text>
              </view>
            </view>
            <view class="goods-item-increase-sign">
              <MartGoodsCounter :goods-id="item.id"></MartGoodsCounter>
            </view>
          </view>
        </view>

        <view
          :style="{
            height: bottomBlankFill + 'px'
          }"
        ></view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, nextTick, computed } from 'vue'
import useScrollWhoFullOfVerticalSpace from '@/hooks/useScrollWhoFullOfVerticalSpace'
import type { ComponentInternalInstance } from 'vue'

// 设置滚动区的高度
const scrollViewHeight = useScrollWhoFullOfVerticalSpace('.category-goods-list')
const goodsScrollViewHeight = useScrollWhoFullOfVerticalSpace('.category-goods-list-right')

const status = ref('local') // local | outlying

// 折叠面板
const showPanel = ref(false)
// 商品大类列表
const majorList = ref([
  {
    id: 1,
    name: '热卖',
    icon: 'fire-filled' as unknown as undefined
  },
  {
    id: 2,
    name: '饮品乳品',
    icon: 'fire-filled' as unknown as undefined
  },
  {
    id: 3,
    name: '热卖',
    icon: 'fire-filled' as unknown as undefined
  },
  {
    id: 4,
    name: '热卖',
    icon: 'fire-filled' as unknown as undefined
  },
  {
    id: 5,
    name: '热卖',
    icon: 'fire-filled' as unknown as undefined
  },
  {
    id: 6,
    name: '热卖',
    icon: 'fire-filled' as unknown as undefined
  },
  {
    id: 7,
    name: '热卖',
    icon: 'fire-filled' as unknown as undefined
  },
  {
    id: 8,
    name: '热卖',
    icon: 'fire-filled' as unknown as undefined
  },
  {
    id: 9,
    name: '热卖',
    icon: 'fire-filled' as unknown as undefined
  },
  {
    id: 10,
    name: '热卖',
    icon: 'fire-filled' as unknown as undefined
  }
])
// 当前选中的大类
const currentMajor = ref(1)

// 商品排序方式
const goodsOrderBy = ref(0) // 默认0，价格升序1，价格降序-1，销量2

// 改变商品排序方式
const changeOrderWay = (way: number) => {
  // console.log(way)
  if (way === 1) {
    if (goodsOrderBy.value === 0 || goodsOrderBy.value === 2) {
      goodsOrderBy.value = 1
    } else if (goodsOrderBy.value === 1) {
      goodsOrderBy.value = -1
    } else if (goodsOrderBy.value === -1) {
      goodsOrderBy.value = 0
    }
  } else {
    if (goodsOrderBy.value === 2) {
      goodsOrderBy.value = 0
    } else {
      goodsOrderBy.value = 2
    }
  }
}

const showFixedOut = ref(false)

// 商品列表
const dataSource1 = [
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
  },
  {
    id: 10,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 10,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 11,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 11,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 12,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 12,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 13,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 13,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 14,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 14,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 15,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 15,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 16,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 16,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 17,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 17,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 18,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 18,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 19,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 19,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 20,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 20,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 21,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 21,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 22,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 22,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 23,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 23,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 24,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 24,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 25,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 25,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 26,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 26,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 27,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 27,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 28,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 28,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 29,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 29,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 30,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 30,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 31,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 31,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 32,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 32,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 33,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 33,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 34,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 34,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 35,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 35,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 36,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 36,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 37,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 37,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 38,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 38,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 39,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 39,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 40,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 40,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 41,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 41,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 42,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 42,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 43,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 43,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 44,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 44,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 45,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 45,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 46,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 46,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 47,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 47,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 48,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 48,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 49,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 49,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 50,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 50,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 51,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 51,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 52,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 52,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 53,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 53,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 54,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 54,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 55,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 55,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 56,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 56,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 57,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 57,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 58,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 58,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 59,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 59,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 60,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 60,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 61,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 61,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 62,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 62,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 63,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 63,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 64,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 64,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 65,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 65,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 66,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 66,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 67,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 67,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 68,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 68,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 69,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 69,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 70,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 70,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 71,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 71,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 72,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 72,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 73,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 73,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 74,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 74,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 75,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 75,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 76,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 76,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 77,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 77,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 78,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 78,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 79,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 79,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 80,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 80,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 81,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 81,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 82,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 82,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 83,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 83,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 84,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 84,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 85,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 85,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 86,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 86,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 87,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 87,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 88,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 88,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 89,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 89,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 90,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 90,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 91,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 91,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 92,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 92,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 93,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 93,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 94,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 94,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 95,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 95,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 96,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 96,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 97,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 97,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 98,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 98,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  },
  {
    id: 99,
    top: 0,
    left: 0,
    productDesc: '盒马 深层玄武岩天然水 500ml*12',
    productTag: ['纯天然', '口感清甜'],
    productDiscount: 7.5,
    priceUnit: '¥',
    priceInt: 99,
    priceFloat: 1,
    productUnitOfSale: '罐',
    originalPrice: 21.5,
    tag: true,
    discount: true
  }
]
const goodsList = ref(dataSource)

// 商品面板的高度(固定高度)
const heightOfGoodsItem = ref(0)
// 滚动区最大可容纳商品面板(固定高度)数
const maxOfGoodsItem = ref(0)
// 滚动区上界
const startIndex = ref(0)
// 滚动区下界
const endIndex = ref(dataSource.length - 1)

// 滚动区可视列表
const showGoodsList = ref(dataSource)
// 滚动区可视列表上面空白填充的高度
const topBlankFill = ref(0)
// 滚动区可视列表下面空白填充的高度
const bottomBlankFill = ref(0)

let instance: ComponentInternalInstance | null
onMounted(async () => {
  instance = getCurrentInstance()
  // console.log(instance)

  const res = await getMaxOfGoodsItem()
  heightOfGoodsItem.value = res.heightOfGoodsItem
  maxOfGoodsItem.value = res.maxOfGoodsItem
  // console.log(heightOfGoodsItem.value, maxOfGoodsItem.value)

  startIndex.value = 0
  endIndex.value = Math.min(
    startIndex.value + maxOfGoodsItem.value - 1 + 12,
    goodsList.value.length - 1
  )

  showGoodsList.value = goodsList.value.slice(startIndex.value, endIndex.value + 1)
  topBlankFill.value = startIndex.value * heightOfGoodsItem.value
  bottomBlankFill.value = (goodsList.value.length - endIndex.value - 1) * heightOfGoodsItem.value
})

function getMaxOfGoodsItem(): Promise<{ heightOfGoodsItem: number; maxOfGoodsItem: number }> {
  return new Promise((resolve, reject) => {
    const query = uni.createSelectorQuery().in(instance)
    query
      .selectAll('.category-goods-list-goods-item')
      .boundingClientRect((res) => {
        const resList = Array.from(res as UniApp.NodeInfo[])
        const item = resList[0] as UniApp.NodeInfo
        const heightOfGoodsItem = item.height as number
        const maxOfGoodsItem = Math.floor(goodsScrollViewHeight.value / heightOfGoodsItem)

        resolve({ heightOfGoodsItem, maxOfGoodsItem })
      })
      .exec()
  })
}

const add = ref(0)
const listScroll = (e: any) => {
  add.value++
  console.log('计数:' + add.value)

  const query = uni.createSelectorQuery().in(instance)
  query
    .selectAll('.category-goods-list-banner')
    .boundingClientRect((res) => {
      const resList = Array.from(res as UniApp.NodeInfo[])
      const item = resList[0] as UniApp.NodeInfo
      const fixedToTop = e.detail.scrollTop - (item.height as number)
      // console.log('scrollLeaveTop: ' + fixedToTop)
      showFixedOut.value = fixedToTop > 0
    })
    .exec()

  query
    .selectAll('.category-goods-list-fixed-inner')
    .boundingClientRect((res) => {
      const resList = Array.from(res as UniApp.NodeInfo[])
      const item = resList[0] as UniApp.NodeInfo

      nextTick(() => {
        const index = Math.floor(
          (e.detail.scrollTop - (item.height as number)) / heightOfGoodsItem.value - 6
        )
        startIndex.value = index < 0 ? 0 : index
        endIndex.value = Math.min(
          startIndex.value + maxOfGoodsItem.value - 1 + 12,
          goodsList.value.length - 1
        )

        console.log('scrollTop: ' + e.detail.scrollTop)
        console.log('startIndex: ' + startIndex.value, 'endIndex: ' + endIndex.value)
        topBlankFill.value = startIndex.value * heightOfGoodsItem.value
        bottomBlankFill.value =
          (goodsList.value.length - endIndex.value - 1) * heightOfGoodsItem.value
        showGoodsList.value = goodsList.value.slice(startIndex.value, endIndex.value + 1)
      })
    })
    .exec()
}
</script>

<style lang="scss">
page {
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5f5;
}

.mart-category-page {
  height: 100%;

  .category-search {
    padding: 0 24rpx;
  }

  .category-store-info {
    padding: 0 24rpx;
    border-bottom: 1px solid #ccc;

    .category-store-name {
      margin: 22rpx 0;
      font-size: 40rpx;
      font-weight: 700;
      line-height: 40rpx;
    }

    .category-store-address {
      display: flex;
      margin-bottom: 20rpx;
      font-size: 24rpx;
      color: #808080;
      justify-content: space-between;
      align-items: center;

      .category-store-address-info {
        width: 350rpx;
        height: 72rpx;
        line-height: 36rpx;
      }

      .category-store-address-distance {
        display: flex;

        .category-store-address-distance-level {
          margin-right: 20rpx;
        }

        [class^='category-store-address-status-'] {
          width: 60rpx;
          height: 32rpx;
          font-size: 24rpx;
          line-height: 32rpx;
          color: #fff;
          text-align: center;
          border-radius: 6rpx;
        }

        .category-store-address-status-local {
          background-color: #4cd964;
        }

        .category-store-address-status-outlying {
          background-color: #f0ad4e;
        }
      }
    }
  }

  .category-goods-list {
    position: relative;
    display: flex;

    .category-goods-list-major {
      width: 156rpx;
      background-color: #f5f5f5;

      &::-webkit-scrollbar {
        display: none;
      }

      .category-goods-list-major-item {
        position: relative;
        height: 144rpx;
        // background-color: green;
        .category-goods-list-major-item-checked {
          position: absolute;
          width: 6rpx;
          height: 144rpx;
          background-color: #3982ee;
        }

        .category-goods-list-major-item-info {
          display: flex;
          height: 144rpx;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .category-goods-list-major-item-name {
            font-size: 28rpx;
          }
        }
      }
    }

    .category-goods-list-fixed-outer {
      position: absolute;
      top: 0;
      right: 0;
      width: calc(100vw - 156rpx);
      overflow: hidden; // 消除子元素的margin对父元素的影响
      background-color: #fff;

      .category-goods-list-minor {
        display: flex;
        height: 58rpx;
        margin: 14rpx 60rpx 0 22rpx;
        white-space: nowrap;

        &::-webkit-scrollbar {
          display: none;
        }

        .category-goods-list-minor-item {
          padding: 12rpx 24rpx;
          margin-right: 12rpx;
          font-size: 24rpx;
          color: #333;
          text-align: center;
          background-color: #f6f6f6;
          border-radius: 8rpx;

          &:last-child {
            margin-right: 0;
          }
        }
      }

      .category-goods-list-arrow {
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        width: 60rpx;
        height: 72rpx;
        line-height: 72rpx;
        text-align: center;
        background-color: red;
      }

      .category-goods-list-panel {
        position: absolute;
        top: 72rpx;
        right: 0;
        width: 100%;
        height: 64rpx;
        padding-left: 22rpx;
        background-color: #fff;
        box-sizing: border-box;
      }

      .category-goods-list-goods-goods-order-by {
        display: flex;
        // height: 96rpx;
        padding: 36rpx 0;
        font-size: 24rpx;
        line-height: 32rpx;
        color: #333;
        background-color: green;
        justify-content: flex-end;

        .category-goods-list-goods-goods-order-by-price {
          display: flex;
          margin-right: 80rpx;

          text {
            margin-right: 8rpx;
          }

          .category-goods-list-goods-goods-order-by-price-icon {
            display: flex;
            height: 32rpx;
            line-height: 16rpx;
            flex-direction: column;
            justify-content: center;
            // align-items: center;
          }
        }

        .category-goods-list-goods-goods-order-by-sale {
          margin-right: 40rpx;
        }
      }
    }

    .category-goods-list-right {
      position: relative;
      width: calc(100vw - 156rpx);
      overflow-anchor: none;

      &::-webkit-scrollbar {
        display: none;
      }

      .category-goods-list-fixed-inner {
        position: relative;
        overflow: hidden; // 消除子元素的margin对父元素的影响
        background-color: #fff;

        .category-goods-list-minor {
          display: flex;
          height: 58rpx;
          margin: 14rpx 60rpx 0 22rpx;
          white-space: nowrap;

          &::-webkit-scrollbar {
            display: none;
          }

          .category-goods-list-minor-item {
            padding: 12rpx 24rpx;
            margin-right: 12rpx;
            font-size: 24rpx;
            color: #333;
            text-align: center;
            background-color: #f6f6f6;
            border-radius: 8rpx;

            &:last-child {
              margin-right: 0;
            }
          }
        }

        .category-goods-list-arrow {
          position: absolute;
          top: 0;
          right: 0;
          display: block;
          width: 60rpx;
          height: 72rpx;
          line-height: 72rpx;
          text-align: center;
          background-color: red;
        }

        .category-goods-list-panel {
          position: absolute;
          top: 72rpx;
          right: 0;
          width: 100%;
          height: 64rpx;
          padding-left: 22rpx;
          background-color: #fff;
          box-sizing: border-box;
        }

        .category-goods-list-goods-goods-order-by {
          display: flex;
          // height: 96rpx;
          padding: 36rpx 0;
          font-size: 24rpx;
          line-height: 32rpx;
          color: #333;
          background-color: green;
          justify-content: flex-end;

          .category-goods-list-goods-goods-order-by-price {
            display: flex;
            margin-right: 80rpx;

            text {
              margin-right: 8rpx;
            }

            .category-goods-list-goods-goods-order-by-price-icon {
              display: flex;
              height: 32rpx;
              line-height: 16rpx;
              flex-direction: column;
              justify-content: center;
              // align-items: center;
            }
          }

          .category-goods-list-goods-goods-order-by-sale {
            margin-right: 40rpx;
          }
        }
      }

      .category-goods-list-goods {
        position: relative;

        .category-goods-list-goods-item {
          position: relative;
          display: flex;
          width: 100%;
          overflow: hidden;
          // width: $water-fall-card-width;
          // border-radius: $water-fall-card-border-radius;
          background-color: #fff;

          .goods-item-pic {
            width: 224rpx;
            height: 224rpx;
            padding: 16rpx;
            // border-radius: $water-fall-card-border-radius $water-fall-card-border-radius 0 0;
            background-color: #fff;

            image {
              display: block;
              width: 224rpx;
              height: 224rpx;
            }
          }

          .goods-item-info {
            height: 224rpx;
            flex: 1;
            padding: 16rpx;
            border-bottom: 1px solid #ccc;

            .goods-item-desc {
              font-size: 26rpx;
              font-weight: 700;
              line-height: 40rpx;
            }

            .goods-item-tag {
              margin-top: 6rpx;
              font-size: 24rpx;
              line-height: 40rpx;
              color: #c3a56c;
            }

            .goods-item-discount {
              margin-top: 6rpx;

              text {
                font-size: 22rpx;
                color: #f32308;
                border: 1px solid #f32308;
                border-radius: 6rpx;
              }
            }

            .goods-item-price {
              margin-top: 10rpx;
              font-size: 24rpx;
              font-weight: 700;
              line-height: 1;
              color: #cf4444;

              .goods-item-price-int {
                font-size: 30rpx;
              }

              .goods-item-unit-of-sale {
                color: #ccc;
              }

              .goods-item-original-price {
                font-weight: 400;
                color: #ccc;
                text-decoration: line-through;
              }
            }
          }

          .goods-item-increase-sign {
            position: absolute;
            right: 16rpx;
            bottom: 16rpx;
          }
        }
      }
      // }
    }
  }
}
</style>
