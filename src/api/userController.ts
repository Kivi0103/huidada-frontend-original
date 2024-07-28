// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** getLoginUser GET /api/user/get/login */
export async function getLoginUserUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseUser_>('/api/user/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** userLogin POST /api/user/login */
export async function userLoginUsingPost(
  body: API.UserLoginRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO_>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogout POST /api/user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPost(
  body: API.UserAddRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userUpdatePassword POST /api/user/updatePassword */
export async function userUpdatePasswordUsingPost(
  body: API.UserUpdateRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/updatePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userUpdateUserName POST /api/user/updateUserName */
export async function userUpdateUserNameUsingPost(
  body: API.UserUpdateRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/user/updateUserName', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
