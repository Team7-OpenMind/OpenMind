import { subjectUrl } from "api/questionApi";
import { CenteredContainer } from "components";
import FloatingButton from "components/button/FloatingButton";
import Error from "components/error/Error";
import Loading from "components/loading/Loading";
import QuestionList from "components/question/QuestionList";
import useMediaQuery from "hooks/useMediaQuery";
import useQuery from "hooks/useQuery";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectSubjects, setSubject } from "store/subjectSlice";
import styled from "styled-components";

const QuestionButton = styled(FloatingButton)`
  position: fixed;
  right: 24px;
  bottom: 24px;
  font-size: 0.9em;
  font-weight: 300;
  padding: 15px 40px;
`;

function Post() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { subjectId } = useParams(); // router의 url parameter
  const mountRef = useRef(false);
  const subjects = useSelector(selectSubjects);

  console.log("cached:", subjects[subjectId]);

  const {
    data: { questionCount, ...subject },
    error,
    isLoading,
  } = useQuery(subjectUrl(subjectId), subjects[subjectId] ?? {});

  useEffect(() => {
    mountRef.current = true;

    return () => {
      mountRef.current = false;
    };
  }, []);

  useEffect(() => {
    dispatch(setSubject({ ...subject, questionCount }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject.id]);

  if (error) {
    const status = error.response?.status;
    const message = status
      ? `HTTP ${status} 에러가 발생했습니다.`
      : error.message;
    return <Error message={message} />;
  }

  if (isLoading && mountRef.current) {
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
      <QuestionList notification={notification} question={subject} />
      <QuestionButton className="shadow-2pt">{buttonText}</QuestionButton>
    </CenteredContainer>
  );
}

export default Post;
