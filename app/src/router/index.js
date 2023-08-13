// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";

// 使用插件
Vue.use(VueRouter);
// 引入路由组件
import home from "@/pages/home";
import login from "@/pages/login";
import register from "@/pages/register";
import search from "@/pages/search";
// vueRouter的原型对象的push先备份一下，我们小修改一下
let originPush = VueRouter.prototype.push;
// 重写push
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call || apply 都可以调用函数一次，并且篡改函数上下文；call传递参数使用逗号隔开，apply需要传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}


// 配置路由
export default new VueRouter({
    // 配置路由
    routes: [
        {
            path: "/",
            redirect: "/home",
            meta: { show: true }
        },
        {
            path: "/home",
            component: home,
            meta: { show: true }
        },
        {
            path: "/login",
            component: login,
            meta: { show: false }
        },
        {
            path: '/search/:keyword?',
            component: search,
            name: "search",
            meta: { show: true },
            props: ($route) => {
                return { keyword: $route.params.keyword, k: "hello world." };
            }
        },
        {
            path: "/register",
            component: register,
            meta: { show: false }
        },
    ]
})
