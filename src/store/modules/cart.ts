/**
 * 在 Setup Store 中：
 * ref() 就是 state 属性
 * computed() 就是 getters
 * function() 就是 actions
 */

import type { cartItem } from '@/types/cart'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    // 购物车列表
    const cartList = ref<cartItem[]>([])

    // 增加某个商品数量
    const increaseGoodsQuantity = (goodsId: number, step: number = 1) => {
      const index = cartList.value.findIndex((item) => item.goodsId === goodsId)
      if (index > -1) {
        cartList.value[index].goodsQuantity += step
      } else {
        cartList.value.push({
          goodsId,
          goodsQuantity: 1
        })
      }
    }

    // 减少某个商品数量
    const decreaseGoodsQuantity = (goodsId: number, step: number = 1) => {
      const index = cartList.value.findIndex((item) => item.goodsId === goodsId)
      if (index > -1) {
        cartList.value[index].goodsQuantity -= step
        if (cartList.value[index].goodsQuantity <= 0) {
          cartList.value = cartList.value.filter((item) => item.goodsId !== goodsId)
        }
      }
    }

    // 设置某个商品数量
    const setGoodsQuantity = (goodsId: number, quantity: number) => {
      const index = cartList.value.findIndex((item) => item.goodsId === goodsId)
      if (index > -1) {
        cartList.value[index].goodsQuantity = quantity
        if (cartList.value[index].goodsQuantity <= 0) {
          cartList.value = cartList.value.filter((item) => item.goodsId !== goodsId)
        }
      }
    }

    // 获取某个商品数量
    const getGoodsQuantity = (goodsId: number) => {
      const index = cartList.value.findIndex((item) => item.goodsId === goodsId)
      return index > -1 ? cartList.value[index].goodsQuantity : 0
    }

    const goodsQuantityTotal = computed(() =>
      cartList.value.reduce((pre, item) => pre + item.goodsQuantity, 0)
    )

    return {
      cartList,
      increaseGoodsQuantity,
      decreaseGoodsQuantity,
      setGoodsQuantity,
      getGoodsQuantity,
      goodsQuantityTotal
    }
  },
  {
    // 小程序端持久化配置
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        }
      }
    }
  }
)
