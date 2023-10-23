<template>
  <view class="mart-goods-counter">
    <uni-icons
      class="counter-sign"
      type="plus-filled"
      size="24"
      :color="count < maxCount ? '#007aff' : '#999'"
      @click="increaseGoods"
    ></uni-icons>
    <view class="counter-count">
      <input
        type="number"
        class="counter-count-input"
        v-model.number="count"
        @blur="counterCountBlur"
        v-if="count > 0"
      />
    </view>
    <uni-icons
      class="counter-sign"
      type="minus-filled"
      size="24"
      :color="count > 0 ? '#007aff' : '#999'"
      @click="decreaseGoods"
      v-if="count > 0"
    ></uni-icons>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/store/modules/cart'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const cartStore = useCartStore()
const { cartList } = storeToRefs(cartStore)

const count = ref(0)
const maxCount = 99

onMounted(() => {
  count.value = cartStore.getGoodsQuantity(props.goodsId)
})

const increaseGoods = () => {
  count.value < maxCount && (count.value++, cartStore.increaseGoodsQuantity(props.goodsId))
  console.log(cartList)
}
const decreaseGoods = () => {
  count.value > 0 && (count.value--, cartStore.decreaseGoodsQuantity(props.goodsId))
}
const counterCountBlur = () => {
  count.value = count.value < 0 ? 0 : Math.min(count.value, maxCount)
  cartStore.setGoodsQuantity(props.goodsId, count.value)
}

const props = defineProps<{
  goodsId: number
}>()
</script>

<style lang="scss">
.mart-goods-counter {
  display: flex;
  flex-direction: row-reverse;
  width: 132rpx;
  height: 42rpx;
  align-items: center;

  .counter-sign {
    width: 42rpx;
    height: 42rpx;

    text {
      font-size: 42rpx !important;
      line-height: 42rpx;
      text-align: center;
    }
  }

  .counter-count {
    width: 48rpx;
    margin: 0 6rpx;

    .counter-count-input {
      width: 36rpx;
      height: 42rpx;
      max-height: 42rpx !important;
      min-height: 42rpx !important;
      font-size: 32rpx;
      line-height: 42rpx;
      text-align: center;
    }
  }
}
</style>
