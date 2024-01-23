import { questionUrl } from "api/questionApi";
import emptySvg from "assets/Empty.svg";
import messageSvg from "assets/Messages.svg";
import Error from "components/error/Error";
import FeedCard from "components/feedCard/FeedCard";
import useQuery from "hooks/useQuery";
import styled from "styled-components";

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 30px 24px 126px;
  max-width: 900px;
  padding: 16px;

  border-radius: 16px;
  background-color: var(--Brown-10);
  border: 1px solid var(--Brown-20);

  @media (min-width: 769px) and (max-width: 1200px) {
    margin: 54px 32px 136px;
  }
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  const {
    data: { count, results },
    error,
  } = useQuery(
    questionUrl(id),
    {
      results: [],
    },
    1000,
  );

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
            results.map((result) => (
              <FeedCard
                key={result.id}
                answer={result.answer}
                content={result.content}
                question={question}
              />
            ))
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
