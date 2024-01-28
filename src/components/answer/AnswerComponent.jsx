import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import "components/../common.css";
//컴포넌트
import Button from "components/button/Button";
//api
import { createAnswer, putUpdateAnswer } from "components/../api/answerApi";

function AnswerComponent({
  question,
  questionId,
  isUpdate,
  getAnswerId,
  getAnswer,
  answerText,
  setAnswerText,
}) {
  const [getStatusCode, setGetStatusCode] = useState(0); //status 코드 저장 (200이면 답변 보여주게함)
  // 유저가 input에 입력하는 내용 실시간으로 반영하는 기능하는 함수
  const handleOnChange = (event) => {
    setAnswerText(event.target.value);
  };
  // 답변입력으로 답변객체 받아서 주면 answerId줌 + 그 아이디로 답변가져오는 req보내서 res로 답변 받아옴
  const makeAnswer = async (answerObj) => {
    const { id: answerId } = await createAnswer(answerObj);
    const { status } = await getAnswer(answerId);

    setGetStatusCode(status); //답변 잘 받아왔으면 답변입력 input 숨김
    window.location.reload();
  };
  // 답변완료 버튼 클릭하면 유저가 입력한 정보 담긴 answerObj makeAnswer에 넘김
  const handleClickAnswerButton = (event) => {
    event.preventDefault();
    const answerObj = {
      questionId: questionId,
      content: answerText,
      isRejected: false,
      team: "3-7",
    };
    makeAnswer(answerObj);
  };
  // 수정완료 버튼 누르면 수정내용 받아서 put요청 보내는 함수에 전달 + 잘 보내졌으면 수정내용 받아오고 status 받아옴
  const updateAnswer = async (updateAnswerObj) => {
    const { status } = await putUpdateAnswer(getAnswerId, updateAnswerObj);
    window.location.reload();
    setGetStatusCode(status); // status 잘 받으면 내용 입력하는 input 숨기기
  };
  // 수정완료 버튼 누르면 수정내용 updateAnswer함수로 보냄
  const handleClickUpdateAnswerButton = (event) => {
    event.preventDefault();
    const updateAnswerObj = {
      content: answerText,
      isRejected: false,
    };
    updateAnswer(updateAnswerObj);
  };

  return (
    <>
      <ImgNameTextBox getStatusCode={getStatusCode}>
        <UserImg src={question.imageSource} />
        <NameTextBox>
          <UserName>{question.name}</UserName>
          <TextArea
            onChange={handleOnChange}
            name="answer"
            placeholder="답변을 입력해주세요"
            value={answerText}
          ></TextArea>
          <AnswerButton
            isEmpty={answerText}
            isUpdate={isUpdate}
            onClick={handleClickAnswerButton}
          >
            답변 완료
          </AnswerButton>
          <UpdateAnswerButton
            isEmpty={answerText}
            isUpdate={isUpdate}
            onClick={handleClickUpdateAnswerButton}
          >
            수정 완료
          </UpdateAnswerButton>
        </NameTextBox>
      </ImgNameTextBox>
    </>
  );
}

const TextArea = styled.textarea`
  border: none;
  outline: none;
  resize: none;
  color: var(--Grayscale-60);
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  background-color: var(--Grayscale-20);
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  height: 186px;
  margin-bottom: 8px;

  &::placeholder {
    color: var(--Grayscale-40);
  }
  @media (min-width: 375px) {
    width: 100%;
    height: 186px;
  }
  @media (min-width: 786px) {
    width: 100%;
    height: 186px;
  }
`;

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

const UserImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  @media (min-width: 375px) {
    width: 48px;
    height: 48px;
  }
`;
//isEmpty는 input이 비어있으면 답변 완료 버튼 클릭 못하게하기 위해 사용
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

const NameTextBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// statusCode가 200이면 정상적으로 응답 받아서 input창 감춤
const ImgNameTextBox = styled.div`
  display: flex;
  gap: 12px;
  display: ${({ statusCode }) => (statusCode === 200 ? "none" : "")};
  width: 100%;
`;

export default AnswerComponent;
