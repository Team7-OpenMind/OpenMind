import { subjectUrl } from "api/questionApi";
import { CenteredContainer } from "components";
import QaHeader from "components/QaHeader";
import FloatingButton from "components/button/FloatingButton";
import Error from "components/error/Error";
import Loading from "components/loading/Loading";
import QuestionModal from "components/modal/question/QuestionModal";
import QuestionList from "components/question/QuestionList";
import { useGetQuery } from "hooks/query";
import useMediaQuery from "hooks/useMediaQuery";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const QuestionButton = styled(FloatingButton)`
  position: fixed;
  right: 24px;
  bottom: ${({ questionCount }) => (questionCount === 0 ? "24px" : "80px")};
  font-size: 0.9em;
  font-weight: 300;
  padding: 15px 40px;
`;

const AnswerButton = styled(FloatingButton)`
  position: fixed;
  right: 24px;
  bottom: 24px;
  font-size: 0.9em;
  font-weight: 300;
  padding: 15px 40px;
  background-color: var(--Brown-50);
`;

function Post() {
  const [latestQuestionId, setLatestQuestionId] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const isModalOpen = searchParams.get("open");
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { subjectId } = useParams(); // router의 url parameter
  const mountRef = useRef(false);

  // 쿼리 스트링을 이용하여 open 값으로 모달 종류 선택 및 열고 닫기 가능
  const handleModalOpen = () => navigate(`/post/${subjectId}?open=true`);

  const handleMoveAnswer = () => navigate(`/post/${subjectId}/answer`);

  const {
    data: { questionCount, ...subject },
    error,
    isLoading,
  } = useGetQuery(subjectUrl(subjectId), {});

  useEffect(() => {
    mountRef.current = true;

    return () => {
      mountRef.current = false;
    };
  }, []);

  if (error) {
    const status = error.response?.status;
    const message = status
      ? `HTTP ${status} 에러가 발생했습니다.`
      : error.message;
    return <Error message={message} />;
  }

  if (isLoading || !mountRef.current) {
    return (
      <CenteredContainer>
        <Loading />
      </CenteredContainer>
    );
  }

  const notification =
    questionCount === 0
      ? "아직 질문이 없습니다"
      : questionCount
        ? `${questionCount}개의 질문이 있습니다.`
        : null;

  const writeButtonText = isMobile ? "질문 작성" : "질문 작성하기";
  const answerButtonText = isMobile ? "답변 작성" : "답변 작성하기";

  return (
    <>
      <QaHeader subject={subject} />
      <CenteredContainer vertical={false}>
        <QuestionList
          latestQuestionId={latestQuestionId}
          notification={notification}
          subject={subject}
          subjectId={subjectId}
        />
        <QuestionButton
          className="shadow-2pt"
          onClick={handleModalOpen}
          questionCount={questionCount}
        >
          {writeButtonText}
        </QuestionButton>
        {questionCount > 0 && (
          <AnswerButton className="shadow-2pt" onClick={handleMoveAnswer}>
            {answerButtonText}
          </AnswerButton>
        )}
        {isModalOpen && (
          <QuestionModal
            onClose={(questionId) => setLatestQuestionId(questionId)}
            userInfo={subject}
          />
        )}
      </CenteredContainer>
    </>
  );
}

export default Post;
