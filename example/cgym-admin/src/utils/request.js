import axios from "axios"
import {ElMessage} from "element-plus";
import useUserStore from "@/store/userStore/user.ts";

// axios基础封装
const Request = axios.create({
    // 根域名
    baseURL: import.meta.env.VITE_APP_BASE_API,

    // 超时时间
    timeout: 5000
})

// axios请求拦截器
Request.interceptors.request.use(config => {
    const userStore = useUserStore()
    if (userStore.token) {
        config.headers.token = userStore.token
    }
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
Request.interceptors.response.use(res => res.data, e => {
    let message = ''
    let status = e.response.status
    switch (status) {
        case 401:
            message = "TOKEN过期"
            break
        case 403:
            message = "无权访问"
            break
        case 404:
            message = "请求地址错误"
            break
        case 500:
            message = "服务器错误"
            break
        default:
            message = "网络错误"
            break
    }
    ElMessage({
        type: 'error',
        message
    })
    return Promise.reject(e)
})

export default Request