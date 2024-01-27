import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  subjectId: "",
  content: "",
  like: "",
  dislike: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
  answer: {
    id: "",
    questionId: "",
    content: "",
    isRejected: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state = { ...state, ...action.payload };
      state.answer = { ...state.answer, ...action.payload.answer };
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectId = (state) => state.user.id;
export const selectSubjectId = (state) => state.user.subjectId;
export const selectContent = (state) => state.user.content;
export const selectLike = (state) => state.user.like;
export const selectDislike = (state) => state.user.dislike;
export const selectCreatedAt = (state) => state.user.createdAt;
export const selectUpdatedAt = (state) => state.user.updatedAt;
export const selectDeletedAt = (state) => state.user.deletedAt;
export const selectAnswer = (state) => state.user.answer;
export const selectAnswerId = (state) => state.user.answer.id;
export const selectAnswerQuestionId = (state) => state.user.answer.questionId;
export const selectAnswerContent = (state) => state.user.answer.content;
export const selectAnswerIsRejected = (state) => state.user.answer.isRejected;
export const selectAnswerCreatedAt = (state) => state.user.answer.createdAt;
export const selectAnswerUpdatedAt = (state) => state.user.answer.updatedAt;
export const selectAnswerDeletedAt = (state) => state.user.answer.deletedAt;

export default userSlice;
