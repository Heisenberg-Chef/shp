import { createApp } from 'vue'
import App from './App.vue'
// 引用element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// element plus  i18n
// 忽略ts类型检测
// @ts-ignore 
import zhCn from 'element-plus/dist/locale/zh-cn.min.mjs'
// svg 插件需要注册
import 'virtual:svg-icons-register'
// 引入自定义插件
import components from '@/components'
// 全局样式
import '@/styles/index.scss'
// 路由
import router from "@/router"
// pinia
import { createPinia } from "pinia"
const pinia = createPinia() // 创建一个pinia对象

let app = createApp(App);

app.use(ElementPlus, {
    locale: zhCn // element 国际化
});

console.log(import.meta.env);
app.use(components);
app.use(router);
app.use(pinia); // 引入 pinia

app.mount('#app');
