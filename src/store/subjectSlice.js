import { createSlice } from "@reduxjs/toolkit";

/** @type {import("./types").SubjectSlice} */
export const subjectSlice = createSlice({
  name: "subject",
  initialState: {},
  reducers: {
    /**
     * @param {import("./types").SubjectState} state state의 타입은 QuestionState
     * @param {import("./types").SetSubjectAction} action action의 타입은 SetQuestionCountPayload
     */
    setSubject: (state, action) => {
      const { id, ...subject } = action.payload;
      state[id] = subject;
    },
  },
});

export const { setSubject } = subjectSlice.actions;

export const selectSubjects = (state) => state.subject;

export default subjectSlice;
