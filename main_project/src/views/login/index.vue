<template>
    <div class="login_container">
        <el-row>
            <!-- xs 小于等于768像素宽的时候，根据xs进行占位 -->
            <!-- 一行是24份 -->
            <!-- 第一个是为了占位 -->
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <!-- 绑定属性到loginForm，绑定rules校验规则 -->
                <el-form class="login-form" :model="loginForm" ref="loginFormRef" :rules="rules">
                    <h1>Hello</h1>
                    <h2>欢迎来到后台管理系统</h2>
                    <el-form-item prop="username">
                        <el-input placeholder="请输入用户名" :prefix-icon="User" v-model="loginForm.username" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <!-- show-password 是否出现显示密码的图标 -->
                        <el-input placeholder="请输入密码" :prefix-icon="Lock" show-password type="password"
                            v-model="loginForm.password" />
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login-btn" type="primary" @click="login" :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>


<script setup lang="ts">
import { reactive, ref } from "vue"
import { User, Lock } from '@element-plus/icons-vue'; // 引用对应的图片
import { ElNotification } from 'element-plus' // 提示信息组件
import useUserStore from "@/store/user"
import { useRouter } from "vue-router"
import { getTime } from "@/utils/time"

const userStore = useUserStore(); // pinia 仓库
const $router = useRouter(); // 路由对象
const loginFormRef = ref();
// reactive 可以直接进行修改。
const loginForm = reactive({
    username: "admin",
    password: "1"
})
const loading = ref(false);
// 表单校验规则 ：username的规则和password的规则，每个字段都可以有多个规则，在该项目中我们只写了一个
const rules = reactive(
    {
        // required是否需要校验，message提示信息，trigger：触发时机change(改变)，blur（拾取焦点）
        username: [{ required: true, min: 5, max: 15, message: '用户名长度为5到15位', trigger: 'blur' }],
        password: [{ required: true, min: 1, max: 20, message: '密码长度至少1位', trigger: 'blur' },]
    }
)


const login = async () => {
    const res = await loginFormRef.value.validate(); // 进行校验
    // 登录加载效果
    loading.value = true;
    try {
        //登录加载
        await userStore.userLogin(loginForm);
        $router.push("/");
        // 返回成功提示信息
        ElNotification({
            type: "success",
            message: "登录成功",
            title: `Hi,${getTime()}~`
        })
        // 关闭登录效果
        loading.value = false
    } catch (error) {
        ElNotification(
            {
                type: "error",
                message: (error as Error).message   // 断言了一下
            }
        )
    }
    loading.value = false
}
</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url("@/assets/images/background.jpg") no-repeat; // 通过项目的相对路径引用图片
    background-size: cover; // cover表达覆盖整个屏幕，图片自适应窗口尺寸

    .login-form {
        width: 70%;
        top: 30vh;
        background: url("@/assets/images/login_form.png") no-repeat;
        background-size: cover;
        position: relative;
        padding: 40px;
        color: #eaeed3;

        h1 {
            font-size: 40px;
        }

        h2 {
            font-size: 20px;
            margin: 20px 0;
        }

        .login-btn {
            width: 100%
        }
    }
}
</style> 