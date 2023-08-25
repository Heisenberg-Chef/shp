import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import App from '@/App.vue'
import globalComponents from '@/plugin/index.ts'
import Particles from "particles.vue3";
import router from "@/router/index.js"
import pinia from "@/store/index.ts"
import "@/style/global/index.scss"
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:svg-icons-register'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)

app.use(ElementPlus)
app.use(globalComponents)
app.use(Particles)
app.use(pinia)
app.mount('#app')
