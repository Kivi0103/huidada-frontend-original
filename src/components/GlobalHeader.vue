<template>
  <el-container>
    <el-header class="global-header">
      <el-menu
          :default-active="nowActive"
          class="header-menu"
          mode="horizontal"
          :ellipsis="false"
      >
        <img src="../assets/logo.png" alt="Logo" class="menu-logo">
        <el-menu-item index="home">主页</el-menu-item>
        <el-menu-item index="createTest">创建应用</el-menu-item>
        <div class="flex-grow" />
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

const nowActive = ref('home');


</script>

<style scoped>
.global-header {
  padding: 0;
  margin: 0;
}
.menu-logo{
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