import axios from "axios";

// // 질문 가져오는 api
// export const getQuestion = async () => {
//   const res = await axios.get(
//     `https://openmind-api.vercel.app/3-7/questions/3715/`,
//   );
//   const data = res.data;
//   return data; //questionID줌
// };

// 질문 생성하면 questionId가 생김 이거 받아와서 쓰면 된다
export const createAnswer = async ({
  questionId,
  content,
  isRejected,
  team,
}) => {
  const res = await axios.post(
    `https://openmind-api.vercel.app/3-7/questions/${questionId}/answers/`,
    {
      questionId,
      content,
      isRejected,
      team,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = res.data;
  return data;
  // result의 id가 answerId임
};
export const getAnswer = async (answerId) => {
  const res = await axios.get(
    `https://openmind-api.vercel.app/3-7/answers/${answerId}/`,
  );
  const data = res;
  return data;
};

// 답변 수정하는 기능
export const putUpdateAnswer = async (answerId, { content, isRejected }) => {
  const res = await axios.put(
    `https://openmind-api.vercel.app/3-7/answers/${answerId}/`,
    {
      content,
      isRejected,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = res;
  return data;
  // answerId, questionId, 수정내용, isRejected, createdAt줌
};

// 질문 삭제하는 기능
export const deleteQuestion = async (questionId) => {
  const res = await axios.delete(
    `https://openmind-api.vercel.app/3-7/questions/${questionId}/`,
  );
  const data = res;
  return data;
};
//
// // 답변 삭제하는 기능 (질문삭제하면 답변도 같이 삭제됨)
// export const DeleteAnswer = async (answerId) => {
//   const res = await axios.delete(
//     `https://openmind-api.vercel.app/3-7/answers/${answerId}/`,
//   );
//   const data = res;
//   console.log(data);
//   return data;
//   // result로 삭제 성공여부 받기
// };
