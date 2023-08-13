//对于axios进行二次封装
import axios from "axios";
//获取仓库:存储数据
import store from "@/store";
//引入进度条
import nprogress from 'nprogress';
//引入相关进度条的样式
import "nprogress/nprogress.css";


// 1 利用axios方法的create，创建一个axios实例
// 2 request就是axios，只不过稍微配置了一下
const requests = axios.create(
    {
        // 配置
        // baseURL 当发送请求的时候都会进行拼接，我们项目中不用书写了
        baseURL: "/api",
        // 响应超时选项
        timeout: 5000,
    }
);

// 请求拦截器，在发送请求之前，请求拦截器可以检测到并且先进行处理。
requests.interceptors.request.use(
    (config) => {
        // config 配置对象，对象里面有一个属性很重要，header请求头。
        nProgress.start();

        if (store.state.shopcart.USER_ID) {
            config.headers.userTempID = store.state.shopcart.USER_ID;
        }

        // token 公共参数
        if (store.state.user.token) {
            config.headers.token = store.state.user.token;
        }
        return config;
    }
);

// 响应拦截器
requests.interceptors.response.use(
    (res) => {
        // 成功响应
        nProgress.done();
        return res.data;
    },
    (error) => {
        // 响应失败的回调函数
        return Promise.reject(new Error('Failed.'))
    }
);


// 对外暴露
export default requests;