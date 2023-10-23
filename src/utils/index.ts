/**
 * 展示加载效果
 *
 * @param show 是否展示
 * @param title 提示信息
 */
function loading(show: boolean, title = '加载中...') {
  if (show) {
    uni.showLoading({ title })
  } else {
    uni.hideLoading()
  }
}

/**
 * 展示提示消息
 *
 * @param title 提示消息
 */
function toast(title: string) {
  uni.showToast({
    icon: 'none',
    title
  })
}

/**
 * 挂载uni简化方案
 */
export default {
  install() {
    if (!uni || typeof uni !== 'object') return
    uni.$u = {
      loading,
      toast
    }
  }
}
