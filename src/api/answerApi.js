import axios from "axios";

// 질문 생성하면 questionId가 생김 이거 받아와서 쓰면 된다
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

export const getAnswer = async (answerId) => {
  const res = await axios.get(`/answers/${answerId}/`);
  const data = res;
  return data;
};

// 답변 수정하는 기능
export const putUpdateAnswer = async (answerId, { content, isRejected }) => {
  const res = await axios.put(`/answers/${answerId}/`, {
    content,
    isRejected,
  });
  const data = res;
  return data;
};

// 질문 삭제하는 기능
export const deleteQuestion = async (questionId) => {
  const res = await axios.delete(`/questions/${questionId}/`);
  const data = res;
  return data;
};
