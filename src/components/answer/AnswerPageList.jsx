import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
//api
import { questionUrl } from "api/questionApi";
import useQuery from "hooks/useQuery";
import { deleteQuestion } from "components/../api/answerApi";
//컴포넌트
import Error from "components/error/Error";
import AnswerPageCard from "./AnswerPageCard";
import Loading from "components/loading/Loading";
import Button from "components/button/Button";
import { CenteredContainer } from "components";
//이미지
import emptySvg from "assets/Empty.svg";
import messageSvg from "assets/Messages.svg";
import arrowDownSvg from "assets/Arrow-down.svg";
import { ReactComponent as infinitySvg } from "assets/infinity.svg";
import { ReactComponent as toggleOnSvg } from "assets/toggle_on.svg";
import { ReactComponent as toggleOffSvg } from "assets/toggle_off.svg";

export function AnswerPageList(props) {
  const {
    notification,
    subject: { id, ...subject }, // subject는 subjectId, name, imageSource를 가지고 있음
  } = props;
  const limitRef = useRef(8);
  const [offset, setOffset] = useState(0);
  const [questionItems, setQuestionItems] = useState([]);
  const infinityRef = useRef(false);
  const [drawTrigger, setDrawTrigger] = useState(false);
  const [noQuestion, setNoQuestion] = useState(false);

  const {
    data: { count, next, results },
    isLoading,
    error,
  } = useQuery(questionUrl(id, limitRef.current, offset), {
    results: [],
  });

  function onClickShowMore() {
    if (count <= offset) {
      setOffset(count);
      return;
    } else {
      setOffset(offset + limitRef.current);
    }
  }

  function onScroll() {
    if (!infinityRef.current) return;

    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 100
    ) {
      if (!isLoading && next) onClickShowMore();
    }
  }

  function onClickInfinityToggle(event, flag) {
    infinityRef.current = flag;
    setDrawTrigger(!drawTrigger);
  }

  useEffect(() => {
    setQuestionItems([...questionItems, ...results]);
    document.addEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  if (error) {
    return <Error />;
  }
  const deleteQA = async (questionId) => {
    const { status } = await deleteQuestion(questionId);
    setNoQuestion(true);
  };

  const handleDeleteButton = () => {
    questionItems.map((result) => deleteQA(result.id));
  };
  console.log(noQuestion);

  return (
    <QuestionContainer>
      <DeleteButton
        count={count}
        noQuetion={noQuestion}
        onClick={handleDeleteButton}
      >
        삭제하기
      </DeleteButton>
      <Notification>
        <img src={messageSvg} alt="message" />
        {noQuestion ? "아직 질문이 없습니다" : notification}
        <InfinitySvg
          src={infinitySvg}
          isInfinity={infinityRef.current}
          alt="infinity"
        />
        {infinityRef.current ? (
          <ToggleOnSvg
            onClick={(event) => onClickInfinityToggle(event, false)}
          />
        ) : (
          <ToggleOffSvg
            onClick={(event) => onClickInfinityToggle(event, true)}
          />
        )}
      </Notification>
      {noQuestion ? (
        <EmptySvg src={emptySvg} alt="empty" />
      ) : (
        <FeedContainer>
          {count === 0 ? (
            <EmptySvg src={emptySvg} alt="empty" />
          ) : (
            questionItems.map((result) => (
              <AnswerPageCard
                key={result.id}
                answer={result.answer}
                content={result.content}
                question={result}
                questionId={result.id}
                subject={subject}
              />
            ))
          )}
          {isLoading ? (
            <CenteredContainer>
              <Loading />
            </CenteredContainer>
          ) : (
            next && (
              <ArrowDownSvg
                src={arrowDownSvg}
                alt="arrow-down"
                onClick={onClickShowMore}
              />
            )
          )}
        </FeedContainer>
      )}
    </QuestionContainer>
  );
}

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 38px 24px 126px;
  max-width: 900px;
  padding: 16px;
  position: relative;

  border-radius: 16px;
  background-color: var(--Brown-10);
  border: 1px solid var(--Brown-20);

  @media (min-width: 768px) {
    margin: 38px 32px 0;
    margin-bottom: 136px;
  }

  @media (min-width: 1201px) {
    margin: 38px 32px 0;
    margin-bottom: 136px;
  }
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const Notification = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 8px;
  margin: 0 0 16px;
  color: var(--Brown-40);
  font-size: 1.1em;
`;

const EmptySvg = styled.img`
  display: flex;
  flex-direction: column;
  margin: 70px;
  @media (min-width: 769px) and (max-width: 1200px) {
    margin: 106px;
  }
  @media (min-width: 1201px) {
    margin: 120px;
  }
`;

const ArrowDownSvg = styled.img`
  width: 30px;
  height: 30px;

  &:hover {
    cursor: pointer;
    transform: scale(1.3);
    transition: transform 0.3s ease-in-out;
  }
`;

const InfinitySvg = styled(infinitySvg)`
  position: absolute;

  right: 52px;
  width: 32px;
  height: 32px;
  path {
    fill: ${(props) =>
      props.isInfinity ? "var(--Brown-40)" : "var(--Grayscale-30)"};
  }
`;

const ToggleOnSvg = styled(toggleOnSvg)`
  position: absolute;

  right: 0;
  width: 48px;
  height: 48px;
  path {
    fill: var(--Blue-50);
  }
`;

const ToggleOffSvg = styled(toggleOffSvg)`
  position: absolute;

  right: 0;
  width: 48px;
  height: 48px;
  path {
    fill: var(--Red-50);
  }
`;

const DeleteButton = styled(Button)`
  text-align: center;
  padding: 0;
  width: 70px;
  height: 25px;
  font-size: 10px;
  font-weight: 400;
  line-height: 25px;
  border-radius: 200px;
  margin-top: 23px;
  position: absolute;
  top: -60px;
  right: 0;
  display: ${({ count }) => (count === 0 ? "none" : "")};
  display: ${({ noQuetion }) => (noQuetion ? "none" : "")};
  @media (min-width: 768px) {
    top: -70px;
    font-size: 15px;
    width: 100px;
    height: 35px;
  }
`;
export default AnswerPageList;
