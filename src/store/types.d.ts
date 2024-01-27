import { PayloadAction } from "@reduxjs/toolkit";
export { Slice } from "@reduxjs/toolkit";

interface Answer {
  id: number;
  questionId: number;
  content: string;
  createdAt: string;
}

interface Question {
  id: number;
  subjectId: number;
  content: string;
  like: number;
  dislike: number;
  createdAt: string;
  answer: Answer;
}

export type QuestionSlice = Slice<QuestionState>;

export interface QuestionState {
  [subjectId: number]: Question;
}

export type SetSubjectAction = PayloadAction<SetSubjectPayload>;

interface SetSubjectPayload {
  subjectId: number;
  subject: Subject;
}

interface Subject {
  id: number;
  subjectId: number;
  question: string;
  answer: string;
  options: string[];
}

export type SubjectSlice = Slice<SubjectState>;

interface SubjectState {
  [subjectId: number]: Question;
}
