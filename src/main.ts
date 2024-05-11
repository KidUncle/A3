import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import 'normalize.css'
import loadSvg from '@/icons'
import { loadAllPlugins } from '@/plugins'
const app = createApp(App)

// 加载插件
loadAllPlugins(app)
// 加载全局 SVG
loadSvg(app)
app.use(store).use(router).mount('#app')
