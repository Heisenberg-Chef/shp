<template>
  <div class="home">
    <el-card>
      <div class="card-user-info">
        <img :src="userStore.avatar">
        <h2>{{ getTime() }}好 <span>{{ userStore.username }}</span></h2>
      </div>
      <div class="card-bg">
        <img src="../../../../src/images/admin/1.png">
      </div>
    </el-card>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import useUserStore from "@/store/userStore/user.ts";
import {getTime} from "@/utils/time.ts";

const userStore = useUserStore()

</script>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;

  .el-card {
    width: 100%;
    height: 100%;

    .card-user-info {
      display: flex;
      height: 80px;
      width: 100%;
      align-items: center;

      img {
        width: 80px;
        height: 80px;
        border-radius: 40px;
      }

      h2 {
        margin-left: 20px;

        span {
          color: #8b51fd;
        }
      }
    }

    .card-bg {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 500px;
      }
    }
  }
}
</style>