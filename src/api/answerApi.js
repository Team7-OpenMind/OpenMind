import axios from "axios";

/**
 * 답변을 생성하는 함수
 * @param {object} answerData 생성할 답변의 데이터를 포함하는 객체
 * @param {string} answerData.questionId 답변이 속한 질문의 ID
 * @param {string} answerData.content 생성할 답변의 내용
 * @param {boolean} answerData.isRejected 답변의 거절 상태 (true: 거절됨, false: 거절되지 않음)
 * @param {string} answerData.team 답변을 생성하는 팀의 ID 또는 이름
 * @returns {Promise} Axios 요청의 응답 데이터를 포함하는 프로미스 객체
 */
export const createAnswer = async ({
  questionId,
  content,
  isRejected,
  team,
}) => {
  const res = await axios.post(`/questions/${questionId}/answers/`, {
    questionId,
    content,
    isRejected,
    team,
  });
  const data = res.data;
  return data;
};

/**
 * 특정 답변을 가져오는 함수
 * @param {string} answerId 가져올 답변의 ID
 * @returns {Promise} Axios 요청의 응답 데이터를 포함하는 프로미스 객체
 */
export const getAnswer = async (answerId) =>
  await axios.get(`/answers/${answerId}/`);

/**
 * 답변을 수정하는 함수
 * @param {string} answerId 수정할 답변의 ID
 * @param {object} data 수정할 내용과 상태를 포함하는 객체
 * @param {string} data.content 수정할 답변의 내용
 * @param {boolean} data.isRejected 수정할 답변의 거절 상태 (true: 거절됨, false: 거절되지 않음)
 * @returns {Promise} Axios 요청의 응답 데이터를 포함하는 프로미스 객체
 */
export const putUpdateAnswer = async (answerId, { content, isRejected }) =>
  await axios.put(`/answers/${answerId}/`, { content, isRejected });

/**
 * 질문을 삭제하는 함수
 * @param {string} questionId 삭제할 질문의 ID
 * @returns {Promise} Axios 요청의 응답 데이터를 포함하는 프로미스 객체
 */
export const deleteQuestion = async (questionId) =>
  await axios.delete(`/questions/${questionId}/`);
