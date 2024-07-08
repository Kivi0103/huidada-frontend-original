import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'
import {getLoginUserUsingGet} from "@/api/userController";
import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 登录用户信息全局状态
 */
export const useUserStore = defineStore('user', () => {
    const isLogin = ref(false);

    const loginUser = ref<API.UserVO>({
    })

    function setLoginUser(newLoginUser: API.UserVO) {
        loginUser.value= newLoginUser
    }

    function setLoginStatus(status: boolean) {
        isLogin.value = status;
    }

    async function fetchLoginUser() {
        const res = await getLoginUserUsingGet();
        if (res.data.code === 0 && res.data.data) {
            loginUser.value = res.data.data;
        } else {
            loginUser.value = { role: ACCESS_ENUM.NOT_LOGIN };
        }
    }
    return { loginUser, setLoginUser, fetchLoginUser, setLoginStatus, isLogin };
})
