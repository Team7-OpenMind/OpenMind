import { useParams } from "react-router-dom";
import "../common.css";
//컴포넌트

import QaHeader from "components/QA-Header";
import AnswerPageList from "components/answer/AnswerPageList";
import { CenteredContainer } from "components";
//api
import useQuery from "hooks/useQuery";
import { subjectUrl } from "api/questionApi";

function Answer() {
  const { subjectId } = useParams();

  const {
    data: { questionCount, ...question },
  } = useQuery(subjectUrl(subjectId), {
    data: [],
  });

  const notification =
    questionCount === 0
      ? "아직 질문이 없습니다"
      : `${questionCount}개의 질문이 있습니다.`;

  return (
    <>
      <QaHeader question={question} />
      <CenteredContainer>
        <AnswerPageList notification={notification} question={question} />
      </CenteredContainer>
    </>
  );
}

export default Answer;
