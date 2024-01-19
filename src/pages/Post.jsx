import { subjectUrl } from "api/questionApi";
import { CenteredContainer } from "components";
import Loading from "components/loading/Loading";
import QuestionList from "components/question/QuestionList";
import useQuery from "hooks/useQuery";

function Post(props) {
  const { id } = props;

  const {
    data: { questionCount },
    isLoading,
  } = useQuery(subjectUrl(id), {
    data: [],
  });

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
  return <QuestionList id={id} notification={notification} />;
}

Post.defaultProps = {
  id: 2375,
};

export default Post;
