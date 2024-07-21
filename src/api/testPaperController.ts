// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** addTestPaper POST /api/testPaper/add */
export async function addTestPaperUsingPost(
  body: API.TestPaperAddRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/testPaper/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** aiGenerateQuestion POST /api/testPaper/aiGenerateQuestion */
export async function aiGenerateQuestionUsingPost(
  body: API.AiGenerateQuestionRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseQuestionContentVO_>('/api/testPaper/aiGenerateQuestion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCount GET /api/testPaper/getCount */
export async function getCountUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/api/testPaper/getCount', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listAppVOByPage POST /api/testPaper/list/page/vo */
export async function listAppVoByPageUsingPost(
  body: API.TestPaperQueryRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageTestPaperVO_>('/api/testPaper/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
