// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** addTestPaper POST /api/testPaper/add */
export async function addTestPaperUsingPost(
  body: API.TestPaperAddRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/testPaper/add', {
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
