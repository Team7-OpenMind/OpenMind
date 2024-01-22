import styled from "styled-components";

const FeedCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-radius: 16px;
  background-color: var(--Grayscale-10);
  gap: 24px;
  width: 100%;

  @media (min-width: 768px) {
    gap: 32px;
    padding: 32px;
  }
`;

const AnsweredStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  width: fit-content;
  background: var(--Grayscale-10);
  border: 1px solid
    ${(props) => (props.answered ? "var(--Brown-40)" : "var(--Grayscale-40)")};
  border-radius: 8px;
  color: ${(props) =>
    props.answered ? "var(--Brown-40)" : "var(--Grayscale-40)"};
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px 8px;
  font-size: 1.3rem;
`;

const DateStyled = styled.div`
  flex-grow: 1;
  color: var(--Grayscale-40);
  font-size: 1.1rem;
`;

const AnswerWrapper = styled.div`
  display: flex;
  gap: 12px;

  & > img {
    border-radius: 50%;
    width: 32px;
    height: 32px;
  }

  @media (min-width: 768px) {
    & > img {
      width: 48px;
      height: 48px;
    }
  }
`;

const AnswerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const AnswerContent = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.1rem;
`;

const HrStyled = styled.hr`
  width: 100%;
  margin: 8px 0;
  border: 1px solid var(--Grayscale-30);
`;

export function getTimeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12));

  if (minutes < 2) {
    return "1분전 ";
  } else if (minutes <= 59) {
    return `${minutes}분전`;
  } else if (hours < 1) {
    return "1시간전";
  } else if (hours <= 23) {
    return `${hours}시간전`;
  } else if (days < 1) {
    return "1일전";
  } else if (days <= 30) {
    return `${days}일전`;
  } else if (months < 1) {
    return "1개월전";
  } else if (months <= 11) {
    return `${months}개월전`;
  } else if (years < 1) {
    return "1년전";
  } else {
    return `${years}년전`;
  }
}

export function FeedCard(props) {
  const { answer, content, question } = props;
  const { createdAt, imageSource, name } = question;
  return (
    <FeedCardStyled className="shadow-1pt">
      <AnsweredStyled answered={answer}>
        {answer ? "답변완료" : "미답변"}
      </AnsweredStyled>
      <QuestionContainer>
        <DateStyled>질문 · {getTimeAgo(createdAt)}</DateStyled>
        {content}
      </QuestionContainer>
      {answer && (
        <AnswerWrapper>
          <img src={imageSource} alt="Respondent" />
          <AnswerStyled>
            {name}
            <DateStyled>{getTimeAgo(answer.createdAt)}</DateStyled>
            <AnswerContent>{answer.content}</AnswerContent>
          </AnswerStyled>
        </AnswerWrapper>
      )}
      <HrStyled />
    </FeedCardStyled>
  );
}

export default FeedCard;
