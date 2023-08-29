import request from "@/utils/requests";
import type { loginForm, loginResponseData, userInfoResponseData } from "./type";
// 统一接口管理：枚举api接口
enum API {
    Login_URL = "/user/login",
    USERINFO_URL = "/user/info"
}

// 登录
export function reqLogin(data: loginForm) {
    return request<any, loginResponseData>({
        url: API.Login_URL,
        method: 'POST',
        data
    })
}

// 获取用户信息
export function reqUserInfo() {
    return request<any, userInfoResponseData>({
        url: API.USERINFO_URL,
        method: 'GET'
    })
}