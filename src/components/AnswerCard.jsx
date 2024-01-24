import styled from "styled-components";
import "../common.css";

import personSvg from "../assets/Person.svg";
//나중에 공통 컴포로 빼도 될듯 답변입력 컴포랑 답변보여주는 컴포 스타일 같음
function AnswerCard({ answer }) {
  return (
    <ImgNameTimeAnswerBox>
      <UserImg src={personSvg} />
      <NameTimeAnswerBox>
        <NameTimeBox>
          <UserName>유저명</UserName>
          <Time>시간표시</Time>
        </NameTimeBox>
        <Answer>{answer}</Answer>
      </NameTimeAnswerBox>
    </ImgNameTimeAnswerBox>
  );
}

// 반응형에 따라 textarea, 버튼, 유저명, 유저사진 변경해줘야함
const Answer = styled.p`
  color: var(--Grayscale-60);
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  width: 203px;
  height: 186px;
  margin: 0;

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

  @media (min-width: 375px) {
    font-size: 18px;
  }
`;

const Time = styled.span`
  color: var(--Grayscale-40);
  font-family: Actor;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
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

const NameTimeAnswerBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameTimeBox = styled.div`
  margin-bottom: 4px;
  display: flex;
  gap: 8px;
`;

const ImgNameTimeAnswerBox = styled.div`
  display: flex;
  gap: 12px;
`;

export default AnswerCard;
