<script setup lang="ts">
import { onLaunch, onShow, onHide, onUnload } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/store/modules/cart'
import { watch } from 'vue'
import type { WatchStopHandle } from 'vue'
let watchGoodsQuantityTotal: WatchStopHandle
onLaunch(() => {
  const cartStore = useCartStore()
  const { goodsQuantityTotal } = storeToRefs(cartStore)
  watchGoodsQuantityTotal = watch(
    goodsQuantityTotal,
    (newValue, oldValue) => {
      console.log('newValue: ' + newValue)

      uni.setTabBarBadge({
        index: 2,
        text: newValue + ''
      })
    },
    { immediate: true }
  )
  console.log(goodsQuantityTotal.value)

  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
onUnload(() => {
  watchGoodsQuantityTotal()
  console.log('App Hide')
})
</script>
<style lang="scss"></style>
