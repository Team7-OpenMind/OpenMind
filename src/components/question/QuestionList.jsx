import messageSvg from "assets/Messages.svg";
import styled from "styled-components";

import "common.css";

const QuestionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--Grayscale-20);
`;

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
  return (
    <QuestionWrapper>
      <QuestionContainer>
        <Notification>
          <img src={messageSvg} alt="message" />
          {notification}
        </Notification>
      </QuestionContainer>
    </QuestionWrapper>
  );
}

QuestionList.defaultProps = {
  id: 2375,
};

export default QuestionList;
