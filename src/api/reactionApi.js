import axios from "axios";

//질문 가져오는 api
export const getQuestion = async () => {
  const res = await axios.get(
    `https://openmind-api.vercel.app/3-7/questions/3693/`,
  );
  const data = res.data;
  return data;
};

//리약션 카운트 하는 api
export const countReaction = async (questionId, reaction) => {
  const res = await axios.post(
    `https://openmind-api.vercel.app/3-7/questions/${questionId}/reaction/`,
    {
      type: reaction,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = res.data;
  return data;
};