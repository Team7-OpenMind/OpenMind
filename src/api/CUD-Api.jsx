import axios from "axios";

// 답변 생성하는 기능
// 질문 생성하면 questionId가 생김 이거 받아와서 쓰면 된다
export async function CreateAnswer(questionId) {
  const res = await axios.post(
    `https://openmind-api.vercel.app/3-7/questions/${questionId}/answers/`,
    {
      questionId: `${questionId}`,
      content: "새로답변생성했을 때 답변 내용",
      isRejected: true,
      team: "3-7",
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const result = res.json();
  // result의 id가 answerId임
}

// 답변 수정하는 기능
export async function UpdateAnswer(answerId) {
  const res = await axios.put(
    `https://openmind-api.vercel.app/3-7/answers/${answerId}/`,
    {
      content: "답변내용 수정",
      isRejected: true,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const result = res.json();
  // answerId, questionId, 수정내용, isRejected, createdAt줌
}

// 답변 일부 수정하는 기능
export async function PartialUpdateAnswer(answerId) {
  const res = await axios.patch(
    `https://openmind-api.vercel.app/3-7/answers/${answerId}/`,
    {
      content:
        "답변내용 일부 수정 얘는 일부만 수정해도 나머지는 그대로 put은 없는 값은 null처리 된다",
      isRejected: true,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const result = res.json();
  // answerId, questionId, 수정내용, isRejected, createdAt줌
}

// 답변 삭제하는 기능
export async function DeleteAnswer(answerId) {
  const res = await axios.delete(
    `https://openmind-api.vercel.app/3-7/answers/${answerId}/`,
  );
  const result = res.json();
  // result로 삭제 성공여부 받기
}

// 질문 삭제하는 기능
export async function DeleteQuestion(answerId) {
  const res = await axios.delete(
    `https://openmind-api.vercel.app/3-7/questions/${questionId}/`,
  );
  const result = res.json();
  // result로 삭제 성공여부 받기
}
