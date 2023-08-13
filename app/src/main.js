// 项目入口文件
import Vue from 'vue'
import App from './App.vue'
// 引入已经配置好的路由
import router from "@/router"
import typenav from "@/components/typenav" // 全局组件名字
// 注册仓库功能
import store from "@/store"

Vue.config.productionTip = false
// 注册全局的组件 param1:组件名字 param2：组件实体
Vue.component(typenav.name, typenav);
// 测试axios
import { reqCategoryList } from '@/api'
reqCategoryList();

new Vue({
  router, // 此处定义的是vue的插件，在这里可以让所有的vue组件都有$route和$router属性
  store, // 注册仓库，组件身上就会多一个$store属性。
  render: h => h(App),
}).$mount('#app')
