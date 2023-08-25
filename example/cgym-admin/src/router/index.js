import {createRouter, createWebHistory} from "vue-router";
import {routerList} from "@/router/routers.js";
import {GET_TOKEN} from "@/utils/token.ts";
import NotFound from "@/components/Common/404/NotFound.vue";
import Login from "@/components/Login/index.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...routerList,
        // 登录页
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        // 404
        {
            path: '/404',
            name: 'notFound',
            component: NotFound
        },
        // 其他
        {
            path: '/:patMatch(.*)*',
            redirect: '/404'
        }
    ],
    // 切换路由跳转到顶部
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})


// 全局前置守卫
router.beforeEach((to, from, next) => {
    document.title = 'CGYM-' + to.meta.title
    let token = GET_TOKEN("Token")
    if (to.name !== 'login') {
        if (!token) {
            next({name: 'login'})
        } else {
            next()
        }
    } else {
        next()
    }
})

// 全局后置守卫
// router.afterEach((to: any, from: any, next: any) => {
//     console.log(bbb)
//     next()
// })
export default router