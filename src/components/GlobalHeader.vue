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
          <div v-if="!userStore.isLogin">
            <el-button type="primary" plain @click="$router.push('/userLogin')">登录</el-button>
            <el-button type="primary" @click="$router.push('/userRegister')">注册</el-button>
          </div>
          <div v-else>
            <el-dropdown>
              <el-link class="user-name" :underline="false">
                <el-avatar
                    src="{{loginUser.headPicture}}"
                />
                <div style="margin-left: 10px">{{ userStore.loginUser.userName }}</div>
              </el-link>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/infoOfUser')">个人中心</el-dropdown-item>
                  <el-dropdown-item @click="doLogout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-menu>
    </el-header>
  </el-container>
</template>

<script setup lang="ts">
import {ref} from "vue";
import router from "@/router";
import {useUserStore} from "@/stores/userStore";
import {userLogoutUsingPost} from "@/api/userController";
import {ElMessage} from "element-plus";
import {useTestPaperStore} from "@/stores/testPaperStore";

const userStore = useUserStore();

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
  // 点击菜单项，跳转到对应的路由
  if( key !== '/' && !userStore.isLogin){
    ElMessage.error('请先登录!');
  }else{
    if(key==="/CreateTestBasicInfo"||key==="/CreateTestQuestions"||key==="/CreateTestResult"){
      useTestPaperStore().isUpdate = false;
      useTestPaperStore().start();
    }
    router.push(key);
  }
}

const doLogout = async () => {
  // 向后端发送退出登录请求
  const response = await userLogoutUsingPost();
  if(response.data.code === 0){
    // 退出登录成功，清空用户信息
    userStore.fetchLoginUser();
    // console.log("退出登录后，store中的信息：", userStore.loginUser, userStore.isLogin)
    // 跳转到首页
    await router.push('/');
    ElMessage.success('退出登录成功');
  }else{
    ElMessage.error('退出登录失败'+response.data.message);
  }
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