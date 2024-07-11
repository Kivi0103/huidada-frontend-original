// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** addScoringResult POST /api/scoringResult/add */
export async function addScoringResultUsingPost(
  body: API.ScoringResultAddRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/scoringResult/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
