import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { countReaction } from "../../api/reactionApi";
// imgs
import { ReactComponent as thumbsUpSvg } from "assets/thumbs-up.svg";
import { ReactComponent as thumbsDownSvg } from "assets/thumbs-down.svg";

const LIKE = "like";
const DISLIKE = "dislike";

function Reaction({ questionId }) {
  const likeRef = useRef();
  const dislikeRef = useRef();
  const [selected, setSelected] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const [countDislike, setCountDislike] = useState(0);
  const [whatReaction, setWhatReaction] = useState("");
  const [tempLike, setTempLike] = useState(false);
  const [tempDislike, setTempDislike] = useState(false);

  const reactionCount = async (reaction) => {
    const { like, dislike } = await countReaction(questionId, reaction);
    setCountLike(like);
    setCountDislike(dislike);
    localStorage.setItem(`${questionId}_like`, like);
    localStorage.setItem(`${questionId}_dislike`, dislike);
  };

  function handleReactionClick(ref, className) {
    if (whatReaction === className) {
      ref.current.children[0].classList.remove(className);
      ref.current.children[1].classList.remove(className);
      setSelected(false);
      setWhatReaction("");

      localStorage.removeItem(`${questionId}_reaction`);
      className === LIKE ? setTempLike(false) : setTempDislike(false);
    }
    if (!selected) {
      //선택 안 했으면 실행
      ref.current.children[0].classList.add(className);
      ref.current.children[1].classList.add(className);
      setSelected(true);

      setWhatReaction(className);

      localStorage.setItem(`${questionId}_reaction`, `${className}`);

      className === LIKE ? setTempLike(true) : setTempDislike(true);
    }
  }

  function handleLikeClick() {
    handleReactionClick(likeRef, LIKE);
  }

  function handleDislikeClick() {
    handleReactionClick(dislikeRef, DISLIKE);
  }

  const ADD_LIKE_STYLE = whatReaction === LIKE ? LIKE : "";
  const ADD_DISLIKE_STYLE = whatReaction === DISLIKE ? DISLIKE : "";

  // INFO : 새로고침 시 localStorage reaction값 초기화
  // TODO : 로그인 기능 추가 시 수정필요
  useEffect(() => {
    const reaction = localStorage.getItem(`${questionId}_reaction`);
    if (reaction) {
      console.log(reaction);
      localStorage.removeItem(`${questionId}_reaction`);
      reactionCount(reaction);
    }

    setCountLike(Number(localStorage.getItem(`${questionId}_like`)));
    setCountDislike(Number(localStorage.getItem(`${questionId}_dislike`)));
  }, [questionId]);

  return (
    <>
      <ReactionBox>
        <ThumbsIconTextBox
          className={LIKE}
          onClick={handleLikeClick}
          ref={likeRef}
        >
          <ThumbsUpSvg
            fill="#818181"
            className={ADD_LIKE_STYLE}
            tempLike={tempLike}
          />
          <LikeText className={ADD_LIKE_STYLE} tempLike={tempLike}>
            좋아요 {countLike + Number(tempLike)}
          </LikeText>
        </ThumbsIconTextBox>
        <ThumbsIconTextBox
          className="dislike"
          onClick={handleDislikeClick}
          ref={dislikeRef}
        >
          <ThumbsDownSvg
            fill="#818181"
            className={ADD_DISLIKE_STYLE}
            tempDislike={tempDislike}
          />
          <DislikeText className={ADD_DISLIKE_STYLE} tempDislike={tempDislike}>
            싫어요 {countDislike + Number(tempDislike)}
          </DislikeText>
        </ThumbsIconTextBox>
      </ReactionBox>
    </>
  );
}

const ThumbsUpSvg = styled(thumbsUpSvg)`
  fill: ${({ tempLike }) => (tempLike ? "var(--Blue-50)  " : "")};
`;

const ThumbsDownSvg = styled(thumbsDownSvg)`
  fill: ${({ tempDislike }) => (tempDislike ? "var(--Red-50)" : "")};
`;

const LikeText = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ tempLike }) => (tempLike ? "var(--Blue-50)" : "")};
`;

const DislikeText = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: ${({ tempDislike }) => (tempDislike ? "var(--Red-50)" : "")};
`;

const ReactionBox = styled.span`
  display: flex;
  gap: 32px;
`;

const ThumbsIconTextBox = styled.div`
  display: flex;
  gap: 6px;
  color: var(--Grayscale-40);

  &:hover {
    cursor: pointer;
  }
`;

export default Reaction;
