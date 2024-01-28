import { createSlice } from "@reduxjs/toolkit";

/** @type {import("./types").SubjectSlice} */
export const subjectSlice = createSlice({
  // createSlice를 이용하여 Redux slice를 생성
  name: "subject",
  initialState: {},

  // 여러 액션을 처리할 리듀서들을 정의
  reducers: {
    /**
     * JSDoc(Javscript Document)주석을 통해 문서화를 할 수 있음
     * @param {import("./types").SubjectState} state state의 타입은 SubjectState
     * @param {import("./types").SetSubjectAction} action action의 타입은 SetSubjectAction
     */
    setSubject: (state, action) => {
      const { id, ...subject } = action.payload;
      state[id] = subject;
    },
  },
});

export const { setSubject } = subjectSlice.actions;

/** @return {import("./types").SubjectState} */
export const selectSubjects = (state) => state.subject;

export default subjectSlice;
