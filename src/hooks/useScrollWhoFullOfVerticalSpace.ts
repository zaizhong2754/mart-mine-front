import { ref, onMounted, getCurrentInstance } from 'vue'

/**
 * 占满页面剩余高度的滚动区
 * @param selectorOfScrollView 滚动区对应的选择器
 * @returns 滚动区应该设置的高度(单位要使用px)
 */
const useScrollWhoFullOfVerticalSpace = (selectorOfScrollView: string) => {
  const scrollViewHeight = ref(0)
  onMounted(() => {
    // 获取组件实例
    const instance = getCurrentInstance()

    const query = uni.createSelectorQuery().in(instance)

    query
      .selectAll(selectorOfScrollView)
      .boundingClientRect((res) => {
        const resList = Array.from(res as UniApp.NodeInfo[])

        const item = resList[0] as UniApp.NodeInfo

        const { windowHeight } = uni.getSystemInfoSync()

        scrollViewHeight.value = windowHeight - (item.top as number)
      })
      .exec()
  })

  return scrollViewHeight
}

export default useScrollWhoFullOfVerticalSpace
