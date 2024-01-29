import styled from "styled-components";
import { useState } from "react";
import { getTimeAgo } from "utils/date";
//컴포넌트
import AnswerComponent from "./AnswerComponent";
import Reaction from "components/reaction/Reaction";
import { ReactComponent as pencilSvg } from "assets/pencil-square.svg";

export function AnswerPageCard(props) {
  const { questionId, answer, content, question, like, dislike } = props;
  const { createdAt, imageSource, name } = question;

  const [answerTextRn, setAnswerTextRn] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

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

  function handleClickIsUpdateButton(event) {
    event.preventDefault();
    setIsUpdate(true);
    setAnswerTextRn(answer.content);
  }

  return (
    <FeedCardStyled className="shadow-1pt">
      <TagEditContainer>
        <AnsweredStyled color={color}>{answerText}</AnsweredStyled>
        {answerText === "답변 완료" ? (
          <PencilSvg onClick={handleClickIsUpdateButton}></PencilSvg>
        ) : (
          ""
        )}
      </TagEditContainer>
      <QuestionContainer>
        <DateStyled>질문 · {getTimeAgo(createdAt)}</DateStyled>
        {content}
      </QuestionContainer>
      {answer && (
        <AnswerWrapper isUpdate={isUpdate}>
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
      {answer === null ? (
        <AnswerComponent
          questionId={questionId}
          question={question}
          answerTag={answerText}
          isUpdate={isUpdate}
          answerText={answerTextRn}
          setAnswerText={setAnswerTextRn}
        />
      ) : (
        ""
      )}
      {isUpdate === true ? (
        <AnswerComponent
          questionId={questionId}
          question={question}
          answerTag={answerText}
          isUpdate={isUpdate}
          getAnswerId={answer.id}
          answerText={answerTextRn}
          setAnswerText={setAnswerTextRn}
        />
      ) : (
        ""
      )}

      <HrStyled />
      <Reaction like={like} dislike={dislike} questionId={questionId} />
    </FeedCardStyled>
  );
}

const TagEditContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const colors = {
  answered: "var(--Brown-40)",
  rejected: "var(--Red-50)",
  unanswered: "var(--Grayscale-40)",
};

const PencilSvg = styled(pencilSvg)`
  color: var(--Brown-40);
  width: 30px;
  height: 30px;

  &:hover {
    color: tomato;
    cursor: pointer;
    transform: scale(1.3);
    transition:
      transform 0.3s ease-in-out,
      tomato 0.3s ease-in-out;
  }
`;

const FeedCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px;
  gap: 24px;

  border-radius: 16px;
  background-color: var(--Grayscale-10);

  @media (min-width: 768px) {
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
  display: ${({ isUpdate }) => (isUpdate ? "none" : "")};

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

export default AnswerPageCard;
