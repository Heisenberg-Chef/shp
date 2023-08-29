import { defineStore } from "pinia" // 定义pinia
import { reqLogin } from "@/api/user/index.ts"
import type { loginForm, loginResponseData } from "@/api/user/type.ts"
import type { userState } from "./types/type"

const useUserStore = defineStore('user', {
    // 小仓库存储数据的地方
    state: (): userState => {
        return { token: localStorage.getItem("TOKEN") }; // localStorage H5提供的存储数据的方式。
    },
    // 异步操作、逻辑执行
    actions: {
        // 用户登录
        // async 返回一个undefined，是一个成功的请求
        async userLogin(formData: loginForm) {
            // 阻塞等待
            let result: loginResponseData = await reqLogin(formData);
            if (result.code === 200) {
                // 类型断言 as 为 string 类型
                // this token 就是pinia中的token变量！
                this.token = (result.data.token as string);
                localStorage.setItem("TOKEN", (result.data.token as string))
                return "ok"
            } else {
                return Promise.reject(new Error(result.data.message));
            }
        }
    },
    getters: {}
}
)

export default useUserStore;