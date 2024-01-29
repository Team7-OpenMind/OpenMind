import { createSlice } from "@reduxjs/toolkit";

/** @type {import("./types").QuestionSlice} */
export const questionSlice = createSlice({
  // createSlice를 이용하여 Redux slice를 생성
  name: "question", // slice의 이름
  initialState: {}, // 초기 상태를 빈 객체로 설정
  reducers: {
    /**
     * JSDoc(Javscript Document)주석을 통해 문서화를 할 수 있음
     * @param {import("./types").QuestionState} state state의 타입은 QuestionState
     * @param {import("./types").SetQuestionsAction} action action의 타입은 SetQuestionPayload
     */

    // 여러 액션을 처리할 리듀서들을 정의
    setQuestions: (state, action) => {
      const { subjectId, subjectQuestions } = action.payload; // action의 payload에서 subjectId와 subjectQuestions를 가져옴
      state[subjectId] = subjectQuestions; // state를 변경하는 함수
    },
  },
});

export const { setQuestions } = questionSlice.actions; // 액션 생성자를 내보냄

/** @return {import("./types").QuestionState} */
export const selectQuestions = (state) => state.question;

export default questionSlice;
