<template>
  <div class="common-layout">
    <template v-if="route.path.startsWith('/user')">
      <UserBasicView/>
    </template>
    <template v-else>
      <el-container>
        <GlobalHeader />
        <el-main class="main-content">
          <router-view />
        </el-main>
        <el-footer class="footer">欢迎来到 徽答答 AI应用答题平台</el-footer>
      </el-container>
    </template>
  </div>
</template>

<script setup lang="ts">

import GlobalHeader from "@/components/GlobalHeader.vue";
import {useRoute} from "vue-router";
import UserBasicView from "@/views/UserBasicView.vue";
import { useUserStore } from "./stores/userStore";

// 实现一次登录，永久全局可用
const userStore = useUserStore();
userStore.fetchLoginUser();
const route = useRoute();

</script>

<style scoped>
.common-layout {
  width: 100%;
  height: 100%;
}
.main-content{
  height: 82vh;
}
.footer{
  height: 20px;
  text-align: center;
  padding-top: 10px;
  box-shadow: 0 -1px 4px -1px rgba(0, 0, 0, 0.1);
}
</style>