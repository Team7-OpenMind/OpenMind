import { PayloadAction } from "@reduxjs/toolkit";
export { Slice } from "@reduxjs/toolkit";

export type QuestionSlice = Slice<QuestionState>;

export interface QuestionState {
  [subjectId: number]: SubjectQuestions;
}

export type SetQuestionsAction = PayloadAction<SetQuestionsPayload>;

interface SetQuestionsPayload {
  subjectId: number;
  subjectQuestions: SubjectQuestions;
}

export type SetSubjectAction = PayloadAction<SetSubjectPayload>;

interface SetSubjectPayload {
  subjectId: number;
  subject: Subject;
}

interface SubjectQuestions {
  count: number;
  next: string;
  results: Question[];
}

export type SubjectSlice = Slice<SubjectState>;

export interface SubjectState {
  [subjectId: number]: Subject;
}
