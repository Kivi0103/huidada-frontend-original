<template>
  <el-container>
    <div class="login-container">
      <el-header style="margin-bottom: 20px">
        <el-row>
          <el-col :span="12">
            <img src="../assets/logo.png" alt="Logo" class="menu-logo" style="width: 80px">
          </el-col>
          <el-col :span="12">
            <h2>登录</h2>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-form
            :label-position="'top'"
            label-width="auto"
            style="max-width: 300px"
            class="login-form"
        >
          <el-form-item label="账号" prop="pass">
            <el-input v-model="userName" type="text" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="密码" prop="checkPass">
            <el-input
                v-model="password"
                type="password"
                autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin">
              登录
            </el-button>
            <div style="flex-grow: 1"></div>
            <el-text type="info">还没有账号？</el-text>
            <el-button type="primary" plain @click="$router.push('/userRegister')">注册</el-button>
          </el-form-item>
          <el-form-item>
            <div style="flex-grow: 1"></div>
            <el-button type="primary" text @click="$router.push('/' )">回到首页</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </div>
  </el-container>
</template>
<script setup lang="ts">
import {ref} from 'vue'

const userName = ref('');
const password = ref('');

const handleLogin = () => {
  // todo 向后端发送登录请求
  console.log(userName.value, password.value);
}


</script>
<style scoped>

.login-container {
  width: 400px;
  max-width: 100%;
  padding: 0px 35px 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -250px 0 0 -200px;
  height: 80vh;
}
</style>