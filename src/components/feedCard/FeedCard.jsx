import styled from "styled-components";
import { getTimeAgo } from "utils/date";

const colors = {
  answered: "var(--Brown-40)",
  rejected: "var(--Red-50)",
  unanswered: "var(--Grayscale-40)",
};

const FeedCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px;
  gap: 24px;

  border-radius: 16px;
  background-color: var(--Grayscale-10);

  @media (min-width: 769px) and (max-width: 1200px) {
    padding: 32px;
  }

  @media (min-width: 1201px) {
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
  border: 1px solid ${(props) => colors[props.color]};
  border-radius: 8px;
  color: ${(props) => colors[props.color]};
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

const NoAnswerContent = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.1rem;
  color: var(--Red-50);
`;

const HrStyled = styled.hr`
  width: 100%;
  margin: 8px 0;
  border: 1px solid var(--Grayscale-30);
`;

export function FeedCard(props) {
  const { answer, content, question } = props;
  const { createdAt, imageSource, name } = question;

  let answerText, color;
  if (answer === null) {
    answerText = "미답변";
    color = "unanswered";
  } else if (answer.isRejected) {
    answerText = "답변 거절";
    color = "rejected";
  } else {
    answerText = "답변 완료";
    color = "answered";
  }

  return (
    <FeedCardStyled className="shadow-1pt">
      <AnsweredStyled color={color}>{answerText}</AnsweredStyled>
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
            {answer.isRejected ? (
              <NoAnswerContent>답변 거절</NoAnswerContent>
            ) : (
              <AnswerContent>{answer.content}</AnswerContent>
            )}
          </AnswerStyled>
        </AnswerWrapper>
      )}
      <HrStyled />
    </FeedCardStyled>
  );
}

export default FeedCard;
