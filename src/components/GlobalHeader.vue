<template>
  <el-container>
    <el-header class="global-header">
      <el-menu
          :default-active="nowActive"
          class="header-menu"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect"
      >
        <img src="../assets/logo.png" alt="Logo" class="menu-logo">
        <el-menu-item v-for="item in visibleRoutes" :index="item.path">{{ item.name }}</el-menu-item>
        <div class="flex-grow"/>
        <div class="user-functions">
          <el-button type="primary" plain @click="$router.push('/userLogin')">登录</el-button>
          <el-button type="primary" @click="$router.push('/userRegister')">注册</el-button>
        </div>
      </el-menu>
    </el-header>
  </el-container>
</template>

<script setup lang="ts">
import {ref} from "vue";
import router from "@/router";

const nowActive = ref('/');
// 获取路由中的所有路由项
const routes = router.getRoutes();

// 过滤掉不需要展示的菜单项
const visibleRoutes = routes.filter(route => {
  return !route.meta.hideInMenu;
})

// 监听路由变化，更新当前激活的菜单项
router.afterEach(() => {
  nowActive.value = router.currentRoute.value.path;
})

const handleSelect = (key: string) => {
  router.push({
    path: key
  })
}

</script>

<style scoped>
.global-header {
  padding: 0;
  margin: 0;
}

.menu-logo {
  padding-bottom: 5px;
  margin: 0 10px;
}

.flex-grow {
  flex-grow: 1;
}

.user-functions {
  margin-top: 10px;
  margin-right: 10px;
}
</style>