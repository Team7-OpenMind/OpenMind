import styled from "styled-components";
import "../common.css";
//컴포넌트
import Button from "components/button/Button";
import QaHeader from "components/QA-Header";
// 이미지 파일들
import personSvg from "../assets/Person.svg";

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
  width: 203px; //반응형 만들때 100%로 바꿔서 양쪽 마진이나 패딩에 맞게 줄게 해야할듯?
  height: 186px;
  margin-bottom: 8px;

  &::placeholder {
    color: var(--Grayscale-40);
  }
  @media (min-width: 375px) {
    width: 548px; //반응형 만들때 100%로 바꿔서 양쪽 마진이나 패딩에 맞게 줄게 해야할듯?
    height: 186px;
  }
  @media (min-width: 786px) {
    width: 560px; //반응형 만들때 100%로 바꿔서 양쪽 마진이나 패딩에 맞게 줄게 해야할듯?
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
  width: 203px; //반응형 만들때 100%로 바꿔서 양쪽 마진이나 패딩에 맞게 줄게 해야할듯?
  height: 46px;
  color: var(--Grayscale-10);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  @media (min-width: 375px) {
    width: 548px; //반응형 만들때 100%로 바꿔서 양쪽 마진이나 패딩에 맞게 줄게 해야할듯?
    height: 46px;
  }
  @media (min-width: 786px) {
    width: 560px; //반응형 만들때 100%로 바꿔서 양쪽 마진이나 패딩에 맞게 줄게 해야할듯?
    height: 46px;
  }
`;

const DeleteButton = styled(Button)`
  padding: 0;
  width: 70px; //반응형 만들때 100%로 바꿔서 양쪽 마진이나 패딩에 맞게 줄게 해야할듯?
  height: 25px;
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 400;
  line-height: 25px;
  border-radius: 200px;
  @media (min-width: 375px) {
    font-size: 15px;
    width: 100px; //반응형 만들때 100%로 바꿔서 양쪽 마진이나 패딩에 맞게 줄게 해야할듯?
    height: 35px;
  }
`;

const AnswerTag = styled(Button)`
  padding: 0;
  width: 76px; //반응형 만들때 100%로 바꿔서 양쪽 마진이나 패딩에 맞게 줄게 해야할듯?
  height: 26px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  background-color: var(--Grayscale-10);
  color: var(--Brown-40);
  border: 1px solid var(--Brown-40);
`;

const NameTextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImgNameTextBox = styled.div`
  display: flex;
  gap: 12px;
`;

function Answer() {
  return (
    <>
      <QaHeader />
      <DeleteButton>삭제하기</DeleteButton>
      <AnswerTag>답변 완료</AnswerTag>
      <ImgNameTextBox>
        <UserImg src={personSvg} />
        <NameTextBox>
          <UserName>유저명</UserName>
          <TextArea name="answer" placeholder="답변을 입력해주세요"></TextArea>
          <AnswerButton>답변 완료</AnswerButton>
        </NameTextBox>
      </ImgNameTextBox>
    </>
  );
}

export default Answer;
