<template>
  <view
    class="mart-radio"
    :style="{
      borderColor: checked ? '#007aff' : '#ccc',
      backgroundColor: checked ? '#007aff' : 'transparent'
    }"
    @click="() => emit('change')"
  >
    <uni-icons
      v-if="checked"
      class="mart-radio-checked"
      type="checkmarkempty"
      color="#fff"
    ></uni-icons>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const emit = defineEmits<{
  (e: 'change', id?: number): void
}>()

defineProps<{
  checked: boolean
}>()
</script>

<style lang="scss">
.mart-radio {
  width: 44rpx;
  height: 44rpx;
  background-color: #007aff;
  border: 1px solid #ccc;
  border-radius: 50%;
  box-sizing: border-box;

  .mart-radio-checked {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44rpx;
    height: 44rpx;

    text {
      position: relative;
      width: 44rpx;
      height: 44rpx;
      font-size: 32rpx !important;
      line-height: 44rpx;
      align-items: center;
    }
  }
}
</style>
