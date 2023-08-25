// 用户小仓库
import {defineStore} from "pinia";
import type {loginForm, loginResponseData, userInfo} from "@/api/sign/type";
import {reqLogin, reqUserInfo, reqLogout} from "@/api/sign";
import {routerList} from "@/router/routers";
import {SET_TOKEN, GET_TOKEN, CLEAR_TOKEN} from "@/utils/token";

const useUserStore = defineStore('User', {
    // 数据
    state: () => {
        return {
            // 用户token
            token: GET_TOKEN('Token'),
            // 菜单路由列表
            menuRouters: routerList,
            // 用户名
            username: '',
            // 头像
            avatar: '',
        }
    },

    // 逻辑
    actions: {
        // 登录
        async userLogin(data: loginForm) {
            const res: loginResponseData = await reqLogin(data)
            if (res.code == 200) {
                this.token = res.data
                SET_TOKEN('Token', res.data)
                return 'ok'
            } else {
                return Promise.reject(new Error(res.data))
            }
        },

        // 获取用户信息
        async getUserInfo() {
            const res: userInfo = await reqUserInfo()
            if (res.code == 200) {
                this.username = res.data.name
                this.avatar = res.data.avatar
                return 'ok'
            } else {
                return Promise.reject(new Error(res.data))
            }
        },

        // 退出登录
        async userLogout() {
            let res: any = await reqLogout()
            if (res.code === 200) {
                this.username = ''
                this.avatar = ''
                this.token = ''
                CLEAR_TOKEN('Token')
                return 'ok'
            } else {
                return Promise.reject(new Error(res.data))
            }
        }
    },

    getters: {}
})

export default useUserStore
