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

/** listByTestId POST /api/scoringResult/listByTestId */
export async function listByTestIdUsingPost(
  body: API.GetScoringResultByIdRequestDTO,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseScoringResultAddRequestDTO_>('/api/scoringResult/listByTestId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
