import styled from "styled-components";
import "../common.css";
//컴포넌트
import Button from "components/button/Button";
import QaHeader from "components/QA-Header";
import AnswerCard from "components/AnswerCard";
// 이미지 파일들
import personSvg from "../assets/Person.svg";
import { createAnswer, getAnswer, putUpdateAnswer } from "../api/answerApi";
import { useState } from "react";

function Answer() {
  const [answerText, setAnswerText] = useState(""); //유저가 input애 실시간으로 입력하는 내용 저장
  const [resAnswer, setResAnswer] = useState(""); //res로 온 답변내용 저장 (답변완료 버튼 누른 후 답변내용 보여주기 위함)
  const [updateAnswerMode, setUpdateAnswerMode] = useState(true); //Todo: 수정하기 버튼 누르면 setupdateAnswer사용해서 boolean값 변경하기
  const [getStatusCode, setGetStatusCode] = useState(0); //status 코드 저장 (200이면 답변 보여주게함)
  // 유저가 input에 입력하는 내용 실시간으로 반영하는 기능하는 함수
  const handleOnChange = (event) => {
    setAnswerText(event.target.value);
  };
  // 답변입력으로 답변객체 받아서 주면 answerId줌 + 그 아이디로 답변가져오는 req보내서 res로 답변 받아옴  +
  const makeAnswer = async (answerObj) => {
    const { id: answerId } = await createAnswer(answerObj);
    const {
      data: { content },
      status,
    } = await getAnswer(answerId);

    setResAnswer(content); //답변 레이아웃에 답변 내용 줌
    setGetStatusCode(status); //답변 잘 받아왔으면 답변입력 input 숨기고 답변보여주는 layout 보여줌
  };
  // 답변완료 버튼 클릭하면 유저가 입력한 정보 담긴 answerObj makeAnswer에 넘김
  const handleClickAnswerButton = (event) => {
    event.preventDefault();
    const answerObj = {
      questionId: 4334, //질문 정보에서 아이디 받아와야함
      content: answerText,
      isRejected: false, //질문 정보에서 받아와야할듯
      team: "3-7",
    };
    makeAnswer(answerObj);
  };
  // 수정완료 버튼 누르면 수정내용 받아서 put요청 보내는 함수에 전달 + 잘 보내졌으면 수정내용 받아오고 status 받아옴
  const updateAnswer = async (updateAnswerObj) => {
    const {
      data: { content },
      status,
    } = await putUpdateAnswer(2085, updateAnswerObj);

    setResAnswer(content); // 수정내용도 답변내용 보여주는 레이아웃에 전달해서 보여주게 하기
    setGetStatusCode(status); // status 잘 받으면 답변 보여주는 레이아웃 보여주고 내용 입력하는 input 숨기기
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
  // 수정하기 버튼 클릭하면 기존의 답변을 가져옴 -> answerId를 getAnswer함수로 주고 해당 질문의 답변을 가져와서 setAnswerText함수로 기존의 답변을 저장함
  const getAnswerToUpdateAnswer = async (answerId) => {
    const {
      data: { content },
      status,
    } = await getAnswer(answerId);
    setAnswerText(content);
  };
  // 수정하기 버튼 대신 임시로 사용 중
  const handleGetAnswerForUpdate = (event) => {
    event.preventDefault();
    getAnswerToUpdateAnswer(2085); // 수정하기 버튼 클릭하면 answerId 받아야함
  };

  return (
    <>
      <QaHeader />
      <DeleteButton>삭제하기</DeleteButton>
      <ImgNameTextBox statusCode={getStatusCode}>
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
            isUpdate={updateAnswerMode}
            onClick={handleClickAnswerButton}
          >
            답변 완료
          </AnswerButton>
          <UpdateAnswerButton
            isEmpty={answerText}
            isUpdate={updateAnswerMode}
            onClick={handleClickUpdateAnswerButton}
          >
            수정 완료
          </UpdateAnswerButton>
        </NameTextBox>
      </ImgNameTextBox>
      <AnswerCard answer={resAnswer} statusCode={getStatusCode} />
      {/*수정하기 버튼 임시로 사용중*/}
      <button onClick={handleGetAnswerForUpdate}>수정하기</button>
    </>
  );
}

const TextArea = styled.textarea`
  border: 1px solid black;
  outline: none; //테두리
  resize: none;
  color: var(--Grayscale-60);
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
  border: 1px solid black; //보더 나중에 삭제
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
// 답변 입력 input 보여주는 컴포넌트
// statusCode가 200이면 정상적으로 응답 받아서 input창은 감추고 답변내용 보여주기 레이아웃을 보여줌
const ImgNameTextBox = styled.div`
  display: flex;
  gap: 12px;
  display: ${({ statusCode }) => (statusCode === 200 ? "none" : "")};
`;

export default Answer;
