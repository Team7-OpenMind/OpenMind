import styled from "styled-components";
import "../common.css";

//컴포넌트
import Button from "components/button/Button";
import QaHeader from "components/QA-Header";
// 이미지 파일들
import personSvg from "../assets/Person.svg";
import { getQuestion, createAnswer, getAnswer } from "api/CUD-Api";
import { useEffect, useState } from "react";
import AnswerCard from "components/AnswerCard";

function Answer() {
  const [answerText, setAnswerText] = useState("");
  const [resAnswer, setResAnswer] = useState("");
  const [updateAnswer, setUpdateAnswer] = useState(true);
  const [statusCode, setStatusCode] = useState(0);

  const question = async (answerObj) => {
    const { id: answerId } = await createAnswer(answerObj);
    const {
      data: { content },
      status,
    } = await getAnswer(answerId);
    setResAnswer(content);
    setStatusCode(status);
  };

  const handleOnChange = (event) => {
    setAnswerText(event.target.value);
  };

  const handleClickAnswerButton = (event) => {
    event.preventDefault();
    console.log(answerText);
    const answerObj = {
      questionId: 3939,
      content: answerText,
      isRejected: false,
      team: "3-7",
    };
    question(answerObj);
    //여기서 답변 생성하는 api사용
  };

  const handleClickUpdateAnswerButton = (event) => {
    event.preventDefault();
    console.log("update햇");
  };

  return (
    <>
      <QaHeader />
      <DeleteButton>삭제하기</DeleteButton>
      <ImgNameTextBox statusCode={statusCode}>
        <UserImg src={personSvg} />
        <NameTextBox>
          <UserName>유저명</UserName>
          <TextArea
            onChange={handleOnChange}
            name="answer"
            placeholder="답변을 입력해주세요"
            value={answerText}
          ></TextArea>
          <AnswerButton
            isEmpty={answerText}
            isUpdate={updateAnswer}
            onClick={handleClickAnswerButton}
          >
            답변 완료
          </AnswerButton>
          <UpdateAnswerButton
            isEmpty={answerText}
            isUpdate={updateAnswer}
            onClick={handleClickUpdateAnswerButton}
          >
            수정 완료
          </UpdateAnswerButton>
        </NameTextBox>
      </ImgNameTextBox>
      <h1>{answerText}</h1>

      <AnswerCard answer={resAnswer} statusCode={statusCode} />
    </>
  );
}

// 반응형에 따라 textarea, 버튼, 유저명, 유저사진 변경해줘야함
const TextArea = styled.textarea`
  border: 1px solid black;
  outline: none; //테두리
  resize: none;
  color: var(--Grayscale-60);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  background-color: var(--Grayscale-20);
  border-radius: 8px;
  padding: 16px;
  width: 203px;
  height: 186px;
  margin-bottom: 8px;

  &::placeholder {
    color: var(--Grayscale-40);
  }
  @media (min-width: 375px) {
    width: 548px;
    height: 186px;
  }
  @media (min-width: 786px) {
    width: 560px;
    height: 186px;
  }
`;
// userimg랑 username 컴포넌트로 만들어도 될듯
const UserName = styled.span`
  color: var(--Grayscale-60);
  font-family: Actor;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  margin-bottom: 4px;
  @media (min-width: 375px) {
    font-size: 18px;
  }
`;
// userimg랑 username 컴포넌트로 만들어도 될듯
const UserImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid black; //보더 나중에 삭제
  @media (min-width: 375px) {
    width: 48px;
    height: 48px;
  }
`;

const AnswerButton = styled(Button)`
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  background-color: ${({ isEmpty }) => (isEmpty === "" ? "#c7bbb5" : "")};
  outline: ${({ isEmpty }) => (isEmpty === "" ? "none" : "")};
  pointer-events: ${({ isEmpty }) => (isEmpty === "" ? "none" : "")};
  display: ${({ isUpdate }) => (isUpdate ? "none" : "")};
`;

const UpdateAnswerButton = styled(Button)`
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  background-color: ${({ isEmpty }) => (isEmpty === "" ? "#c7bbb5" : "")};
  outline: ${({ isEmpty }) => (isEmpty === "" ? "none" : "")};
  pointer-events: ${({ isEmpty }) => (isEmpty === "" ? "none" : "")};
  display: ${({ isUpdate }) => (isUpdate ? "" : "none")};
`;

const DeleteButton = styled(Button)`
  text-align: center;
  padding: 0;
  width: 70px;
  height: 25px;
  font-family: Pretendard;
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

const NameTextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImgNameTextBox = styled.div`
  display: flex;
  gap: 12px;
  display: ${({ statusCode }) => (statusCode === 200 ? "none" : "")};
`;

export default Answer;
