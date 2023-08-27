<template>

  <template v-for="item in routerList" :key="item.path">
    <!--    没有孩子,也就是一级路由-->
    <template v-if="!item.children">
      <el-menu-item :index="item.path" v-if="item.meta.visual" @click="goRoute">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        {{ item.meta.title }}
      </el-menu-item>
    </template>
    <!--    有子路由且只有一个-->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item :index="item.children[0].path" v-if="item.children[0].meta.visual" @click="goRoute">
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        {{ item.children[0].meta.title }}
      </el-menu-item>
    </template>
    <!--    有多个子路由-->
    <template v-if="item.children && item.children.length > 1">
      <el-sub-menu :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>
            {{ item.meta.title }}
          </span>
        </template>
        <Menu :routerList="item.children"/>
      </el-sub-menu>
    </template>
  </template>

</template>

<script setup>
import Menu from "./Menu.vue"
import {useRouter} from "vue-router";

defineProps(['routerList'])
const router = useRouter()
const goRoute = (vc) => {
  router.push(vc.index)
}

</script>

<style scoped>

</style>