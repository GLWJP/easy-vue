import { createApp } from 'vue'
import App from './App.vue'
import './styles/reset.scss'

const app = createApp(App)

// ElementPlus 相关配置
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/index.css'
app.use(ElementPlus, {
  locale: zhCn,
})
// ElementPlus Icons pnpm install @element-plus/icons-vue
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

createApp(App).mount('#app')
