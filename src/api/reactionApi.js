import axios from "axios";

// const REACTION_API_URL = `https://openmind-api.vercel.app/3-7/questions/${questionId}/reaction/`;

export const getQuestion = async () => {
  const res = await axios.get(
    `https://openmind-api.vercel.app/3-7/questions/3693/`,
  );
  const data = res.data;
  return data;
};

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
  console.log(res.data.like, res.data.dislike);
};
