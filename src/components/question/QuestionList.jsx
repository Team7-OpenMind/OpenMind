import React, { useState, useRef, useEffect } from "react";

import { questionUrl } from "api/questionApi";
import emptySvg from "assets/Empty.svg";
import messageSvg from "assets/Messages.svg";
import arrowDownSvg from "assets/Arrow-down.svg";
import Error from "components/error/Error";
import FeedCard from "components/feedCard/FeedCard";
import useQuery from "hooks/useQuery";
import styled from "styled-components";
import Loading from "components/loading/Loading";

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 353px 24px 126px;
  max-width: 900px;
  padding: 16px;

  border-radius: 16px;
  background-color: var(--Brown-10);
  border: 1px solid var(--Brown-20);

  @media (min-width: 768px) {
    margin: 423px 32px 0;
    margin-bottom: 136px;
  }

  @media (min-width: 1201px) {
    margin: 423px 32px 0;
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
  display: flex;
  justify-content: center;
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

export function QuestionList(props) {
  const {
    notification,
    question: { id, ...question }, // id를 제외한 name, imageSource, questionCount, createdAt은 question으로 받아옴
  } = props;
  const limitRef = useRef(8);
  const [offset, setOffset] = useState(0);
  const [questionItems, setQuestionItems] = useState([]);

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

  useEffect(() => {
    setQuestionItems([...questionItems, ...results]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  if (error) {
    return <Error />;
  }

  return (
    <>
      <QuestionContainer>
        <Notification>
          <img src={messageSvg} alt="message" />
          {notification}
        </Notification>
        <FeedContainer>
          {count === 0 ? (
            <EmptySvg src={emptySvg} alt="empty" />
          ) : (
            questionItems.map((result) => (
              <FeedCard
                key={result.id}
                answer={result.answer}
                content={result.content}
                question={question}
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
    </>
  );
}

QuestionList.defaultProps = {
  id: 2375,
};

export default QuestionList;
