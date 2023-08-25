<template>
  <div class="home">
    <div class="home-left" :class="{fold: adminStore.fold ? true: false}">
      <MenuFold v-if="adminStore.fold"/>
      <MenuExpand v-else/>
    </div>
    <div class="home-right" :class="{fold: adminStore.fold ? true: false}">
      <div class="home-header">
        <Navi/>
      </div>
      <div class="home-body" v-if="flag">
        <RouterView/>
      </div>
    </div>
  </div>
</template>

<script setup>
import MenuExpand from "@/components/Home/components/MenuExpand.vue"
import MenuFold from "@/components/Home/components/MenuFold.vue"
import Navi from "@/components/Home/components/HomeNav.vue"
import useAdminStore from "@/store/adminStore/admin.ts";
// nextTick:当响应式数据发生变化，获取响应后的dom
import {watch, ref, nextTick} from "vue";

const adminStore = useAdminStore()

// 销毁组件
const flag = ref(true)
watch(() => adminStore.refresh, () => {
  flag.value = false
  // 重新加载组件
  nextTick(() => {
    flag.value = true
  })
})
</script>

<style scoped lang="scss">
.home {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;

  .home-left {
    box-sizing: border-box;
    padding: 20px;
    width: 20vw;
    background-color: #181e33;
    transition: all 0.2s;

    &.fold {
      width: 5vw;
    }
  }

  .home-right {
    width: 80vw;
    display: flex;
    flex-direction: column;
    transition: all 0.3s;

    .home-header {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 20px;
      height: 12vh;
      box-shadow: 0 4px 5px -4px rgba(59, 50, 50, 0.2);
    }

    .home-body {
      box-sizing: border-box;
      padding: 20px;
      height: 88vh;
      overflow: scroll;
    }

    &.fold {
      width: 95vw;
    }
  }
}

</style>