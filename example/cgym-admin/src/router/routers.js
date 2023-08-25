import Home from "../components/Home/index.vue";
import HomeBody from "../components/Home/components/HomeBody.vue";
import User from "../components/Admin/Auth/User.vue";
import AuthMenu from "../components/Admin/Auth/Menu.vue";
import Role from "../components/Admin/Auth/Role.vue";
import Screen from "../components/Admin/Screen/index.vue";
import Attribute from "../components/Admin/Poduct/Attribute.vue";
import Brand from "../components/Admin/Poduct/Brand.vue";

export const routerList = [
    // 首页
    {
        path: "/",
        component: Home,
        redirect: '/home',
        meta: {
            icon: 'Flag',
            visual: true,
            title: 'CGYM',
        },
        children: [
            {
                path: "/home",
                component: HomeBody,
                name: 'home',
                meta: {
                    icon: 'HomeFilled',
                    title: '首页',
                    visual: true
                }
            },
        ]
    },
    // 数据
    {
        path: '/screen',
        name: 'screen',
        component: Screen,
        meta: {
            icon: 'Histogram',
            title: '数据',
            visual: true
        }
    },
    // 管理
    {
        path: "/auth",
        component: Home,
        redirect: '/auth/sign',
        meta: {
            icon: 'UserFilled',
            title: '权限管理',
            visual: true
        },
        children: [
            {
                path: '/auth/sign',
                component: User,
                meta: {
                    icon: 'HelpFilled',
                    title: "用户管理",
                    visual: true
                }
            },
            {
                path: '/auth/role',
                component: Role,
                meta: {
                    icon: 'Avatar',
                    title: "角色管理",
                    visual: true
                }
            },
            {
                path: '/auth/menu',
                component: AuthMenu,
                meta: {
                    icon: 'Menu',
                    title: "菜单管理",
                    visual: true
                }
            },
        ]
    },
    // 产品
    {
        path: "/product",
        component: Home,
        redirect: '/product/brand',
        meta: {
            icon: 'Goods',
            title: '产品管理',
            visual: true
        },
        children: [
            {
                path: '/product/brand',
                component: Brand,
                meta: {
                    icon: 'StarFilled',
                    title: "品牌管理",
                    visual: true
                }
            },
            {
                path: '/auth/attribute',
                component: Attribute,
                meta: {
                    icon: 'Promotion',
                    title: "属性管理",
                    visual: true
                }
            }
        ]
    }
]