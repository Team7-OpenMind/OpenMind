import { BASE_URL } from "api";

export const subjectUrl = (subjectId) => `${BASE_URL}/subjects/${subjectId}/`;

export const questionUrl = (subjectId) =>
  `${BASE_URL}/subjects/${subjectId}/questions/`;
