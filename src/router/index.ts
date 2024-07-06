import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GlobalHeader from '../components/GlobalHeader.vue'
import UserLoginView from "@/views/UserLoginView.vue";
import UserRegisterView from "@/views/UserRegisterView.vue";
import IndexContent from "@/components/IndexContent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/index',
      name: 'index',
      component: IndexContent
    },
    {
      path: '/header',
      name: 'header',
      component: GlobalHeader
    },
    {
      path: '/userLogin',
      name: 'userLogin',
      component: UserLoginView
    },
    {
      path: '/userRegister',
      name: 'userRegister',
      component: UserRegisterView
    }
  ]
})

export default router
