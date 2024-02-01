import { questionUrl } from "api/questionApi";
import arrowDownSvg from "assets/Arrow-down.svg";
import emptySvg from "assets/Empty.svg";
import messageSvg from "assets/Messages.svg";
import { ReactComponent as infinitySvg } from "assets/infinity.svg";
import { ReactComponent as toggleOffSvg } from "assets/toggle_off.svg";
import { ReactComponent as toggleOnSvg } from "assets/toggle_on.svg";
import { CenteredContainer } from "components";
import Error from "components/error/Error";
import FeedCard from "components/feedCard/FeedCard";
import Loading from "components/loading/Loading";
import { useGetQuery } from "hooks/query";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectQuestions, setQuestions } from "store/questionSlice";
import styled from "styled-components";

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 38px 24px 126px;
  max-width: 900px;
  padding: 16px;

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
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 8px;
  margin: 0 0 16px;
  color: var(--Brown-40);
  font-size: clamp(0.7em, 4.5vw, 1.1em);
  text-align: left;
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
  width: clamp(16px, 8%, 32px);
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

export function QuestionList(props) {
  const {
    notification,
    latestQuestionId,
    subject: { id, ...subject }, // id를 제외한 name, imageSource, questionCount, createdAt은 question으로 받아옴
  } = props;
  const limitRef = useRef(8);
  const [offset, setOffset] = useState(0);
  const [questionItems, setQuestionItems] = useState([]);
  const infinityRef = useRef(false);
  const [drawTrigger, setDrawTrigger] = useState(false);

  const dispatch = useDispatch();
  const questionStore = useSelector(selectQuestions);

  const {
    data: { count, next, results },
    isLoading,
    error,
  } = useGetQuery(
    questionUrl(id, limitRef.current, offset),
    { results: [] },
    {
      queryKey: ["questions", latestQuestionId, id, limitRef.current, offset],
    },
  );

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

  /* 글을 작성해서 latestQuestionId가 바뀌면 새로고침 */
  useEffect(() => {
    setOffset(0);
    setQuestionItems([]);
    /* Redux에 저장된 데이터를 초기화 */
    dispatch(
      setQuestions({
        subjectId: id,
        subjectQuestions: { results: [] },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestQuestionId]);

  useEffect(() => {
    if (isLoading) return;
    /* questionItems에 results를 합치고 중복 제거 */
    const newQuestions = [...questionItems, ...results].filter(
      (question, idx, array) =>
        idx === array.findIndex((item) => item.id === question.id),
    );
    setQuestionItems(newQuestions);
    document.addEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  // Redux store에 데이터를 업데이트 하는 역할을 하는 훅
  useEffect(() => {
    if (!results) return;
    dispatch(
      setQuestions({
        subjectId: id,
        subjectQuestions: { count, next, results },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]); // results가 바뀔 때마다 실행

  if (error) {
    return <Error />;
  }

  let questions = (
    questionItems.length ? questionItems : questionStore[id]?.results ?? []
  ).map((result) => (
    <FeedCard
      key={result.id}
      answer={result.answer}
      content={result.content}
      like={result.like}
      dislike={result.dislike}
      createdAt={result.createdAt}
      subject={subject}
      questionId={result.id}
    />
  ));

  return (
    <>
      <QuestionContainer>
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
          {count === 0 ? <EmptySvg src={emptySvg} alt="empty" /> : questions}
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
      </QuestionContainer>
    </>
  );
}

export default QuestionList;
