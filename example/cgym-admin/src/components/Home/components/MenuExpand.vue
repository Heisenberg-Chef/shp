<template>
  <div class="menu-box">
    <Logo/>
    <el-scrollbar class="scrollbar">
      <el-menu background-color="#181e33" text-color="white" active-text-color="#8b51fd" :default-active="route.path">
        <Menu :routerList="userStore.menuRouters"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import Logo from "@/components/Common/Logo/Logo.vue"
import Menu from "@/components/Common/Menu/Menu.vue"
import useUserStore from "@/store/userStore/user.ts";

const userStore = useUserStore()
const route = useRoute()
</script>

<style scoped lang="scss">
.menu-box {
}
</style>