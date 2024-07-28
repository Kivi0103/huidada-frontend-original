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

/** deleteTestPaper POST /api/testPaper/deleteTestPaper */
export async function deleteTestPaperUsingPost(
  body: API.DeleteTestPaperDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/testPaper/deleteTestPaper', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getTestPaperById POST /api/testPaper/getTestPaperById */
export async function getTestPaperByIdUsingPost(
  body: API.GetTestPaperByIdDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseTestPaperVO_>('/api/testPaper/getTestPaperById', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getTestPaperCount POST /api/testPaper/getTestPaperCount */
export async function getTestPaperCountUsingPost(
  body: API.TestPaperQueryRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/testPaper/getTestPaperCount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
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

/** updateTestPaper POST /api/testPaper/updateTestPaper */
export async function updateTestPaperUsingPost(
  body: API.TestPaperUpdateRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/testPaper/updateTestPaper', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
