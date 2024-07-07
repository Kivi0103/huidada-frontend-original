import { createRouter, createWebHistory } from 'vue-router'
import UserLoginView from "@/views/UserLoginView.vue";
import UserRegisterView from "@/views/UserRegisterView.vue";
import IndexContent from "@/components/IndexContent.vue";
import CreateTest from "@/components/CreateTestBasicInfo.vue";
import UserBasicView from "@/views/UserBasicView.vue";
import CreateTestBasicInfo from "@/components/CreateTestBasicInfo.vue";
import CreateTestQuestions from "@/components/CreateTestQuestions.vue";
import CreateTestResults from "@/components/CreateTestResults.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '主页',
      component: IndexContent
    },
    {
      path: '/CreateTestBasicInfo',
      name: '创建测试',
      component: CreateTestBasicInfo
    },
    {
      path: '/CreateTestQuestions',
      name: '创建测试第二步',
      component: CreateTestQuestions,
      meta: {
        hideInMenu: true
      }
    },
    {
      path: '/CreateTestResults',
      name: '创建测试第三步',
      component: CreateTestResults,
      meta: {
        hideInMenu: true
      }
    },
    {
      path: '/test',
      name: '创建测试答案列表',
      component: CreateTestResults
    },
    {
      path: '/create2',
      name: '创建测试问题列表',
      component: CreateTestQuestions
    },
    {
      path: '/user',
      name: '用户',
      component: UserBasicView,
      children: [
        {
          path: '/userLogin',
          name: 'userLogin',
          component: UserLoginView,
          meta: {
            hideInMenu: true
          }
        },
        {
          path: '/userRegister',
          name: 'userRegister',
          component: UserRegisterView,
          meta: {
            hideInMenu: true
          }
        }
      ],
      meta:{
        hideInMenu: true
      }
    }
  ]
})

export default router
