import { questionUrl } from "api/questionApi";
import messageSvg from "assets/Messages.svg";
import { CenteredContainer } from "components";
import Error from "components/error/Error";
import useQuery from "hooks/useQuery";
import styled from "styled-components";

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 30px 24px 126px;
  max-width: 716px;

  border-radius: 16px;
  background-color: var(--Brown-10);
  border: 1px solid var(--Brown-20);

  @media (min-width: 1124px) {
    margin: 50px 150px 130px;
  }

  @media (max-width: 768px) {
    padding: 0 32px;
    margin: 54px 32px 136px;
  }

  @media (max-width: 414px) {
    padding: 16px 24px 126px;
  }
`;

const Notification = styled.p`
  color: var(--Brown-40);
  font-size: 1.1em;
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: center;
`;

export function QuestionList({ id, notification }) {
  const {
    data: { count },
    error,
  } = useQuery(
    questionUrl(id),
    {
      data: {},
    },
    1000,
  );

  if (error) {
    return <Error />;
  }

  return (
    <CenteredContainer>
      <QuestionContainer>
        <Notification>
          <img src={messageSvg} alt="message" />
          {notification}
        </Notification>
      </QuestionContainer>
    </CenteredContainer>
  );
}

QuestionList.defaultProps = {
  id: 2375,
};

export default QuestionList;
