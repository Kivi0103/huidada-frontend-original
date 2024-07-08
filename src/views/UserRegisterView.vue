<template>
  <el-container>
    <div class="login-container">
      <el-header style="margin-bottom: 20px">
        <el-row>
          <el-col :span="12">
            <img src="../assets/logo.png" alt="Logo" class="menu-logo" style="width: 80px">
          </el-col>
          <el-col :span="12">
            <h2>注册</h2>
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
          <el-form-item label="设置账号" :error="userNameError">
            <el-input v-model="userName" type="text" autocomplete="off" @input="validateUserName"/>
          </el-form-item>
          <el-form-item label="设置密码" :error="passwordError">
            <el-input v-model="password" type="password" @input="validatePassword" show-password/>
          </el-form-item>
          <el-form-item label="确认密码" :error="checkPasswordError">
            <el-input v-model="checkPassword" type="password" @input="validateCheckPassword" show-password/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleRegister">
              注册
            </el-button>
            <div style="flex-grow: 1"></div>
            <el-text type="info">已经有账号了？</el-text>
            <el-button type="primary" plain @click="$router.push('/userLogin')">登录</el-button>
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
import {reactive, ref} from 'vue';
import {House} from "@element-plus/icons-vue";
import {userRegisterUsingPost} from "@/api/userController";
import { ElMessage } from "element-plus";
import router from "@/router";
import {useUserStore} from "@/stores/userStore";

const userName = ref('');
const password = ref('');
const checkPassword = ref('');
const userNameError = ref('');
const passwordError = ref('');
const checkPasswordError = ref('');

const validateUserName = () => {
  const userNameValue = userName.value;
  if (userNameValue.length < 5 || userNameValue.length > 20) {
    userNameError.value = '账号长度必须在5-20个字符之间';
  } else if (/^\d+$/.test(userNameValue)) {
    userNameError.value = '账号不能只含有数字';
  } else {
    userNameError.value = '';
  }
};

const validatePassword = () => {
  const passwordValue = password.value;
  if (passwordValue.length < 8 || passwordValue.length > 20) {
    passwordError.value = '密码长度必须在8-20个字符之间';
  } else if (!(/[a-zA-Z]/.test(passwordValue) && /\d/.test(passwordValue))) {
    passwordError.value = '密码必须同时含有数字和字母';
  } else {
    passwordError.value = '';
  }
};

const validateCheckPassword = () => {
  if (checkPassword.value !== password.value) {
    checkPasswordError.value = '两次输入的密码不一致';
  } else {
    checkPasswordError.value = '';
  }
};

const handleRegister = async () => {
  validateUserName();
  validatePassword();
  validateCheckPassword();
  if (!userNameError.value && !passwordError.value && !checkPasswordError.value) {
    // 转成后端需要的格式
    const userData = reactive({
      headPicture: '',
      password: password.value,
      passwordConfirm: checkPassword.value,
      userName: userName.value
    } as API.UserAddRequestDTO);

    // 发送请求
    const res = await userRegisterUsingPost(userData);
    if (res.data.code === 0) {
      ElMessage.success("注册成功！请登录");
      await router.push({
        path: "/",
        replace: true,
      });
    } else {
      ElMessage.error("注册失败！" + res.data.message);
    }

  }
};
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