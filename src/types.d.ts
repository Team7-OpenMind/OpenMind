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
  answer?: Answer;
}

interface Subject {
  id: number;
  name: string;
  imageSource: string;
  questionCount: number;
  createdAt: string;
}
