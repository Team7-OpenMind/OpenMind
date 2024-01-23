import { subjectUrl } from "api/questionApi";
import { CenteredContainer } from "components";
import FloatingButton from "components/button/FloatingButton";
import Loading from "components/loading/Loading";
import QuestionList from "components/question/QuestionList";
import useMediaQuery from "hooks/useMediaQuery";
import useQuery from "hooks/useQuery";
import styled from "styled-components";
import Error from "components/error/Error";

const QuestionButton = styled(FloatingButton)`
  position: fixed;
  right: 24px;
  bottom: 24px;
  font-size: 0.9em;
  font-weight: 300;
  padding: 15px 40px;
`;

function Post(props) {
  const { id } = props;
  const isMobile = useMediaQuery("(max-width: 767px)");

  const {
    data: { questionCount },
    error,
    isLoading,
  } = useQuery(subjectUrl(id), {
    data: [],
  });

  if (error) {
    const status = error.response?.status;
    const message = status
      ? `HTTP ${status} 에러가 발생했습니다.`
      : error.message;
    return <Error message={message} />;
  }

  if (isLoading) {
    return (
      <CenteredContainer>
        <Loading />
      </CenteredContainer>
    );
  }

  const notification =
    questionCount === 0
      ? "아직 질문이 없습니다"
      : `${questionCount}개의 질문이 있습니다.`;

  const buttonText = isMobile ? "질문 작성" : "질문 작성하기";

  return (
    <CenteredContainer>
      <QuestionList id={id} notification={notification} />
      <QuestionButton className="shadow-2pt">{buttonText}</QuestionButton>
    </CenteredContainer>
  );
}

Post.defaultProps = {
  id: 2375,
};

export default Post;
