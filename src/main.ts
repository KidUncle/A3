import { createApp, Directive } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import 'normalize.css'
import loadSvg from '@/icons'
import { loadAllPlugins } from '@/plugins'
import * as directives from '@/directives'
import '@/router/permission'
const app = createApp(App)

// 加载插件
loadAllPlugins(app)
// 加载全局 SVG
loadSvg(app)
// 自定义指令
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

app.use(store).use(router).mount('#app')
