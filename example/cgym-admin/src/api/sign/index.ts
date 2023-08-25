import request from "@/utils/request.js"
import type {loginForm, loginResponseData, userInfo} from "@/api/sign/type";

// 枚举接口
enum API {
    LGOIN_URL = "http://114.115.179.162:8022/prod-api/admin/acl/index/login",
    USERINFO_URL = "http://114.115.179.162:8022/prod-api/admin/acl/index/info",
    LOGOUT_URL = "http://114.115.179.162:8022/prod-api/admin/acl/index/logout"
}

export const reqLogin = (data: loginForm) => request.post<any, loginResponseData>(API.LGOIN_URL, data)
export const reqUserInfo = () => request.get<any, userInfo>(API.USERINFO_URL)
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)