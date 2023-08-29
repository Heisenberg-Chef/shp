import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"

// 创建路由器
let router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/login/index.vue")
        },
        {
            path: "/",
            name: "home",
            component: () => import("@/views/home/index.vue")
        },
        {
            path: "/404",
            name: "404",
            component: () => import("@/views/404/index.vue")
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: '/404',
            name: "Any"
        }
    ],
    // 滚动行为 -- 切换路由之后，重置滚动条的位置
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
});

export default router;