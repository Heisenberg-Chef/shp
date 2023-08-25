<template>
  <div class="login">
    <div class="login-form">
      <div class="login-form-header center">
        <h1>登录</h1>
      </div>
      <div class="login-form-body center">
        <input type="text" class="login-form-input" name="account" v-model="userInfo.username"
               placeholder="Please enter your username">
        <input type="text" class="login-form-input" name="password" v-model="userInfo.password"
               placeholder="Please enter your password">
        <div class="protocol">
          <input type="checkbox">
          <span>我已阅读并同意协议</span>
          <a href="#">后台管理协议</a>
        </div>
      </div>
      <div class="login-form-footer center">
        <BigBtn id="loginBtn" @click="login" :value="value" @keyup.enter="login"/>
      </div>
    </div>
  </div>

</template>

<script setup>
import BigBtn from "@/components/Common/Button/BigBtn.vue"
import useUserStore from "@/store/userStore/user.ts";
import {ElNotification, ElMessage} from 'element-plus'
import {useRouter, useRoute} from 'vue-router'
import {ref, reactive} from "vue";
import {getTime} from "@/utils/time.ts";

const value = ref("登录")
const userInfo = reactive({
  username: 'admin',
  password: 'atguigu123'
})

const useStore = useUserStore()
const router = useRouter()
const route = useRoute()

// 登录
const login = async () => {
  try {
    await useStore.userLogin(userInfo)
    const redirect = route.query.redirect
    await router.push({path: redirect || '/'})
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `${getTime()}好`
    })
  } catch (error) {
    ElMessage({
      type: 'error',
      message: error.message
    })
  }
}

</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-form {
    color: white;
    border-radius: 20px;
    position: fixed;
    width: 750px;
    height: 500px;
    box-sizing: border-box;
    background-color: white;
    padding: 40px 20px;
  }

  .login-form-header {
    height: 100px;

    h1 {
      color: black;
      font-weight: 900;
    }
  }

  .login-form-body {
    display: flex;
    flex-direction: column;
    height: 200px;

    .login-form-input {
      height: 40px;
      font-size: 15px;
      padding-left: 20px;
      border-radius: 5px;
      width: 400px;
      margin-bottom: 20px;
      border: #8b51fd 1px solid;

      &:focus {
        outline: #8b51fd 2px solid;
      }
    }

    .protocol {
      span {
        padding-left: 5px;
        font-size: 12px;
        color: #505050;
      }

      a {
        font-size: 13px;
        padding-left: 5px;
        color: #8b51fd;
      }
    }
  }

  .login-form-footer {

  }
}
</style>