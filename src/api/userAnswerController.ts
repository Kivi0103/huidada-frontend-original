// @ts-ignore
/* eslint-disable */
import request from '@/request';

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
