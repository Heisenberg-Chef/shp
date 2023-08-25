<template>
  <div class="menu-box">
    <div class="menu-logo center">
      <img src="../../../../src/images/sites/logo.png">
    </div>
    <div v-for="item in userStore.menuRouters" class="menu-icon-item center" :key="item.path">
      <RouterLink :to="item.path">
        <el-icon size="25">
          <component :is="item.meta.icon"></component>
        </el-icon>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import useUserStore from "@/store/userStore/user.ts";

const userStore = useUserStore()

</script>

<style scoped lang="scss">
.menu-box {
  display: flex;
  flex-direction: column;

  .menu-logo {
    height: 80px;

    img {
      width: 35px;
    }
  }

  .menu-icon-item {
    height: 100px;
    cursor: pointer;

    .el-icon {
      &:hover {
        color: #8b51fd;
      }
    }
  }
}

</style>