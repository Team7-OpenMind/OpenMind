import styled from "styled-components";
import "../common.css";

import personSvg from "../assets/Person.svg";
//답변내용 보여주는 컴포넌트
function AnswerCard({ answer, statusCode }) {
  return (
    <ImgNameTimeAnswerBox statusCode={statusCode}>
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
//statusCode가 200이면 정상적으로 응답 받아서 input창은 감추고 답변내용 보여주기 레이아웃을 보여줌
const ImgNameTimeAnswerBox = styled.div`
  display: flex;
  gap: 12px;
  display: ${({ statusCode }) => (statusCode === 200 ? "" : "none")};
`;

export default AnswerCard;
