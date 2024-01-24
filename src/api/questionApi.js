import { BASE_URL } from "api";

export const subjectListUrl = (limit, offset) =>
  `${BASE_URL}/subjects/?limit=${limit}&offset=${offset}`;

export const subjectUrl = (subjectId) => `${BASE_URL}/subjects/${subjectId}/`;

export const questionUrl = (subjectId, limit, offset) =>
  `${BASE_URL}/subjects/${subjectId}/questions/?limit=${limit}&offset=${offset}`;
