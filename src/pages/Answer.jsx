import styled from "styled-components";
import "../common.css";
import QaHeader from "components/QA-Header";
// 이미지 파일들
import personSvg from "../assets/Person.svg";

const TextArea = styled.textarea`
  border: none;
  outline: none; //테두리
  resize: none;
  color: var(--Grayscale-40);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  background-color: var(--Grayscale-20);
  border-radius: 8px;
  padding: 16px;
  width: 203px; //반응형 만들때 100%로 바꿔서 양쪽 마진이나 패딩에 맞게 줄게 해야할듯?
  height: 186px;
`;
// userimg랑 username 컴포넌트로 만들어도 될듯
const UserName = styled.span`
  color: var(--Grayscale-60);
  font-family: Actor;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  margin-bottom: 4px;
`;
// userimg랑 username 컴포넌트로 만들어도 될듯
const UserImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid black; //보더 나중에 삭제
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
      <ImgNameTextBox>
        <UserImg src={personSvg} />
        <NameTextBox>
          <UserName>유저명</UserName>
          <TextArea name="answer">답변을 입력해주세요</TextArea>
        </NameTextBox>
      </ImgNameTextBox>
    </>
  );
}

export default Answer;
