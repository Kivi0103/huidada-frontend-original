// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** generateUserAnswerId GET /api/userAnswer/generateId */
export async function generateUserAnswerIdUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/userAnswer/generateId', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getUserAnswerCount POST /api/userAnswer/getUserAnswerCount */
export async function getUserAnswerCountUsingPost(
  body: API.UserAnswerQueryRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/userAnswer/getUserAnswerCount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listUserAnswerVOByPage POST /api/userAnswer/list/page/vo */
export async function listUserAnswerVoByPageUsingPost(
  body: API.UserAnswerQueryRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserAnswerVO_>('/api/userAnswer/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** submitCustomAnswer POST /api/userAnswer/submitCustomAnswer */
export async function submitCustomAnswerUsingPost(
  body: API.CommitUserChoiceRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseTestResultVO_>('/api/userAnswer/submitCustomAnswer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userAnswerCuntByTestPaperId GET /api/userAnswer/userAnswerCuntByTestPaperId */
export async function userAnswerCuntByTestPaperIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userAnswerCuntByTestPaperIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListAppAnswerResultCountVO_>(
    '/api/userAnswer/userAnswerCuntByTestPaperId',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
