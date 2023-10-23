import { createSSRApp } from 'vue'
import App from './App.vue'
import pinia from '@/store'
import utils from '@/utils'

export function createApp() {
  const app = createSSRApp(App)

  app.use(utils)
  app.use(pinia)

  return {
    app
  }
}
