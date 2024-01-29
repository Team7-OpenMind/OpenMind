import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { countReaction } from "../../api/reactionApi";
//css
import "./reaction.css";
// imgs
import { ReactComponent as ThumbsUpSvg } from "assets/thumbs-up.svg";
import { ReactComponent as ThumbsDownSvg } from "assets/thumbs-down.svg";

const SELECTED = "selected";
const LIKE = "like";
const DISLIKE = "dislike";

function Reaction({ questionId }) {
  const likeRef = useRef();
  const dislikeRef = useRef();
  const [selected, setSelected] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const [countDislike, setCountDislike] = useState(0);
  const [whatReaction, setWhatReaction] = useState("");
  const [resetLike, setResetLike] = useState(false);
  const [resetDislike, setResetDislike] = useState(false);

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

      className === LIKE ? setResetLike(true) : setResetDislike(true);
    }
    if (!selected) {
      //선택 안 했으면 실행
      ref.current.children[0].classList.add(className);
      ref.current.children[1].classList.add(className);
      setSelected(true);

      setWhatReaction(className);

      if (localStorage.getItem(`${questionId}_${className}_on`) === "0") {
        reactionCount(className);
      }
      localStorage.setItem(`${questionId}_${className}_on`, "1");

      className === LIKE ? setResetLike(false) : setResetDislike(false);
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

  useEffect(() => {
    localStorage.setItem(`${questionId}_like_on`, "0");
    localStorage.setItem(`${questionId}_dislike_on`, "0");

    setCountLike(localStorage.getItem(`${questionId}_like`));
    setCountDislike(localStorage.getItem(`${questionId}_dislike`));
  }, [questionId]);

  return (
    <>
      <ReactionBox>
        <ThumbsIconTextBox
          className={LIKE}
          onClick={handleLikeClick}
          ref={likeRef}
        >
          <ThumbsUpSvg fill="#818181" className={ADD_LIKE_STYLE} />
          <ReactionText className={ADD_LIKE_STYLE}>
            좋아요 {countLike - (resetLike ? 1 : 0)}
          </ReactionText>
        </ThumbsIconTextBox>
        <ThumbsIconTextBox
          className="dislike"
          onClick={handleDislikeClick}
          ref={dislikeRef}
        >
          <ThumbsDownSvg fill="#818181" className={ADD_DISLIKE_STYLE} />
          <ReactionText className={ADD_DISLIKE_STYLE}>
            싫어요 {countDislike - (resetDislike ? 1 : 0)}
          </ReactionText>
        </ThumbsIconTextBox>
      </ReactionBox>
    </>
  );
}

//Todo: 폰트관련 속성 나중에 rem으로 변경
const ReactionBox = styled.span`
  display: flex;
  gap: 32px;
`;

const ThumbsIconTextBox = styled.div`
  display: flex;
  gap: 6px;
  color: var(--Grayscale-40);
  /* Todo: 나중에 애니메이션 추가하면 좋을 듯 */
  &:hover {
    cursor: pointer;
  }
`;

const ReactionText = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
`;

export default Reaction;
