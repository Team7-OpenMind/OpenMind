import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
//api
import { questionUrl } from "api/questionApi";
import useQuery from "hooks/useQuery";
//컴포넌트
import Error from "components/error/Error";
import AnswerPageCard from "./AnswerPageCard";
import Loading from "components/loading/Loading";
import DeleteBtn from "./Delete";
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
    question: { id, ...question }, // id를 제외한 name, imageSource, questionCount, createdAt은 question으로 받아옴
  } = props;
  const limitRef = useRef(8);
  const [offset, setOffset] = useState(0);
  const [questionItems, setQuestionItems] = useState([]);
  const infinityRef = useRef(false);
  const [drawTrigger, setDrawTrigger] = useState(false);

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

  return (
    <QuestionContainer>
      {questionItems.map((result) => (
        <DeleteBtn key={result.id} questionId={result.id} />
      ))}
      <Notification>
        <img src={messageSvg} alt="message" />
        {notification}
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
      <FeedContainer>
        {count === 0 ? (
          <EmptySvg src={emptySvg} alt="empty" />
        ) : (
          questionItems.map((result) => (
            <AnswerPageCard
              key={result.id}
              answer={result.answer}
              content={result.content}
              question={question}
              questionId={result.id}
            />
          ))
        )}
        {isLoading ? (
          <Loading />
        ) : (
          next && (
            <img
              src={arrowDownSvg}
              alt="arrow-down"
              onClick={onClickShowMore}
            />
          )
        )}
      </FeedContainer>
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

  > img {
    width: 30px;
    height: 30px;

    &:hover {
      cursor: pointer;
      transform: scale(1.3);
      transition: transform 0.3s ease-in-out;
    }
  }
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

export default AnswerPageList;
