import { useParams } from "react-router-dom";
import styled from "styled-components";
import "../common.css";
//컴포넌트
import Button from "components/button/Button";
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
      <DeleteButton>삭제하기</DeleteButton>
      <CenteredContainer>
        <AnswerPageList notification={notification} question={question} />
      </CenteredContainer>
    </>
  );
}

const DeleteButton = styled(Button)`
  text-align: center;
  padding: 0;
  width: 70px;
  height: 25px;
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 400;
  line-height: 25px;
  border-radius: 200px;
  @media (min-width: 375px) {
    font-size: 15px;
    width: 100px;
    height: 35px;
  }
`;
export default Answer;
