import axios from 'axios';
import { ElMessage } from 'element-plus'; // 用来显示成功与失败信息的小组件

// 创建 request对象
const request = axios.create(
    {
        baseURL: import.meta.env.VITE_APP_BASE_API,
        timeout: 5000
    }
)
// 添加请求拦截器
request.interceptors.request.use((config) => {
    // config配置对象
    config.headers.SayMyName = "Heisenberg";
    // console.log(config);
    // 其中有headers属性请求头
    return config;
})

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        // console.log(response);
        return response.data;
    },
    (error) => {
        // 处理网络错误
        let msg = '';
        let status = error.response.status;
        switch (status) {
            case 401:
                msg = "token过期";
                break;
            case 403:
                msg = '无权访问';
                break;
            case 404:
                msg = "请求地址错误";
                break;
            case 500:
                msg = "服务器出现问题";
                break;
            default:
                msg = "无网络";
        }
        ElMessage(
            {
                type: "error",
                message: msg
            }
        )
        return Promise.reject(error);
    }
)

export default request;