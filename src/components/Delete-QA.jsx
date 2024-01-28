import styled from "styled-components";
import "../common.css";
//컴포넌트
import Button from "components/button/Button";
//api
import { deleteQuestion } from "../api/answerApi";

function DeleteQA() {
  // 질문 삭제하면 답변도 같이 삭제됨
  async function deleteQuestions(questionId) {
    const { status } = await deleteQuestion(questionId);
  }

  function handleClickDeleteQuestion(event) {
    event.preventDefault();
    deleteQuestions(4409); // 질문 id 받아와서 써야함(전부 다 삭제하려면 forEach 써야할듯)
  }

  return (
    <>
      <DeleteButton onClick={handleClickDeleteQuestion}>삭제하기</DeleteButton>
    </>
  );
}

const DeleteButton = styled(Button)`
  text-align: center;
  padding: 0;
  width: 70px;
  height: 25px;
  font-size: 10px;
  font-weight: 400;
  line-height: 25px;
  border-radius: 200px;
  @media (min-width: 375px) {
    font-size: 15px;
    width: 100px;
    height: 35px;
  }
`;

export default DeleteQA;
