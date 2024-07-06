<template>
  <div class="common-layout">
    <el-container>
      <GlobalHeader />
      <el-main class="main-content">
        <HomeView />
      </el-main>
      <el-footer class="footer">欢迎来到 徽答答 AI应用答题平台</el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">

import GlobalHeader from "@/components/GlobalHeader.vue";
import HomeView from "@/views/HomeView.vue";
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