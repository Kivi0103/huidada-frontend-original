// @ts-ignore
/* eslint-disable */
import request from '@/request';

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
