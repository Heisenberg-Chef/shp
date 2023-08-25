<template>
  <div class="home-nav">
    <div class="home-nav-left">
      <el-icon size="25" @click="changeIcon">
        <component :is="adminStore.fold ? 'Expand' : 'Fold'"></component>
      </el-icon>
      <el-breadcrumb :separator-icon="ArrowRight" style="margin-left: 10px">
        <el-breadcrumb-item v-for="(item, index) in route.matched" :key="index" v-show="item.meta.title">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="home-nav-right">
      <div class="icon-right-use">
        <el-tooltip
            effect="dark"
            content="刷新"
            placement="bottom"
        >
          <el-button :icon="Refresh" size="large" circle @click="refreshOfBody"/>
        </el-tooltip>
        <el-tooltip
            effect="dark"
            content="大屏"
            placement="bottom"
        >
          <el-button :icon="FullScreen" size="large" circle @click="fullScreen"/>
        </el-tooltip>
        <el-tooltip
            effect="dark"
            content="主题切换"
            placement="bottom"
        >
          <el-button v-if="lightTheme" :icon="Sunny" size="large" @click="openSwitch" circle/>
          <el-button v-else :icon="Moon" size="large" @click="openSwitch" circle/>
        </el-tooltip>
      </div>
      <el-tooltip
          effect="dark"
          content="个人信息"
          placement="bottom"
      >
        <el-avatar size="large" @click="switchOfCard = !switchOfCard" :src="userStore.avatar"/>
      </el-tooltip>
    </div>
  </div>
  <div class="home-nav-card" v-show="switchOfCard">
    <div class="card-heard center">
      <h2>{{ userStore.username }}</h2>
    </div>
    <el-divider/>
    <div class="card-body">
      <p class="card-body-item center">账户设置</p>
      <p class="card-body-item center">隐私政策</p>
      <p class="card-body-item center" @click="logout">退出登录</p>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from "vue-router";
import useUserStore from "@/store/userStore/user.ts";
import useAdminStore from "@/store/adminStore/admin.ts";
import {ArrowRight, Refresh, FullScreen, Sunny, Moon} from "@element-plus/icons-vue";

// 卡片
let switchOfCard = ref(false)

// 主题模式
const lightTheme = ref(true)

// 折叠菜单
const adminStore = useAdminStore()
const changeIcon = () => {
  adminStore.fold = !adminStore.fold
}

// 获取用户信息
const userStore = useUserStore()
onMounted(() => {
  userStore.getUserInfo()
})

// 退出登录
const router = useRouter()
const logout = async () => {
  await userStore.userLogout()
  await router.push({path: '/login', query: {redirect: route.path}})
}

// 面包屑
const route = useRoute()

// 刷新body内容组件
const refreshOfBody = () => {
  adminStore.refresh = !adminStore.refresh
}

// 全屏
const fullScreen = () => {
  // 获取当前是否全屏
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

// 主题切换对话框
const openSwitch = () => {
  lightTheme.value = !lightTheme.value
  const html = document.documentElement
  lightTheme.value ? html.className = '' : html.className = 'dark'
}
</script>

<style scoped lang="scss">
.home-nav {
  height: 100%;
  display: flex;
  justify-content: space-between;

  .home-nav-left {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .home-nav-right {
    height: 100%;
    display: flex;
    align-items: center;

    .el-avatar {
      cursor: pointer;
    }

    .icon-right-use {
      margin-right: 15px;
    }
  }
}

.home-nav-card {
  font-family: 微软雅黑;
  z-index: 100;
  width: 240px;
  height: 320px;
  position: fixed;
  right: 10px;
  box-shadow: 0 4px 5px 3px rgba(59, 50, 50, 0.2);
  background-color: white;

  .card-heard {
    height: 50px;

    h2 {
      color: #8b51fd;
    }
  }

  .card-body {
    p {
      height: 40px;
      cursor: pointer;
      margin-bottom: 10px;
      transition: 0.3s all;

      &:hover {
        background-color: #8b51fd;
        color: white;
      }
    }
  }
}
</style>