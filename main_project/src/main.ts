import { createApp } from 'vue'
import App from './App.vue'
// 引用element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// element plus  i18n
// 忽略ts类型检测
// @ts-ignore 
import zhCn from 'element-plus/dist/locale/zh-cn.min.mjs'
// 引入自定义插件
import components from '@/components'

let app = createApp(App);

app.use(ElementPlus,{
    locale: zhCn // element 国际化
});

console.log(import.meta.env);
app.use(components)

app.mount('#app');
