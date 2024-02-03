import { useParams } from "react-router-dom";
//컴포넌트
import { CenteredContainer } from "components";
import QaHeader from "components/QaHeader";
import AnswerPageList from "components/answer/AnswerPageList";
//api
import { subjectUrl } from "api/questionApi";
import { useGetQuery } from "hooks/query";

function Answer() {
  const { subjectId } = useParams();
  const {
    data: { questionCount, ...subject },
  } = useGetQuery(subjectUrl(subjectId), {});

  const notification =
    questionCount === 0
      ? "아직 질문이 없습니다"
      : `${questionCount}개의 질문이 있습니다.`;

  return (
    <>
      <QaHeader subject={subject} back={`/post/${subjectId}`} />
      <CenteredContainer vertical={false}>
        <AnswerPageList
          notification={notification}
          subject={subject}
          subjectId={subjectId}
        />
      </CenteredContainer>
    </>
  );
}

export default Answer;
