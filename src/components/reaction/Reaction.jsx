import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { getQuestion, countReaction } from "../../api/reactionApi";
//css
import "./reaction.css";
// img
import { ReactComponent as ThumbsUpSvg } from "assets/thumbs-up.svg";
import { ReactComponent as ThumbsDownSvg } from "assets/thumbs-down.svg";

const SELECTED = "selected";
const REACTION = "reaction";
const LIKE = "like";
const DISLIKE = "dislike";

function Reaction() {
  const likeRef = useRef();
  const dislikeRef = useRef();

  const [selected, setSelected] = useState(() => {
    const getSelected = localStorage.getItem(SELECTED);
    if (getSelected === "true") {
      return true;
    } else {
      return false;
    }
  });
  console.log(selected);
  const [liked, setLiked] = useState(localStorage.getItem(LIKE));
  const [disliked, setDisliked] = useState(localStorage.getItem(DISLIKE));
  const question = async (reaction) => {
    const { id } = await getQuestion();
    const { like, dislike } = await countReaction(id, reaction);
    setLiked(like);
    setDisliked(dislike);
  };

  function handleReactionClick(ref, className) {
    const getReaction = localStorage.getItem(REACTION);
    if (getReaction === className) {
      ref.current.children[0].classList.remove(className);
      ref.current.children[1].classList.remove(className);
      setSelected(false);
      localStorage.setItem(SELECTED, false);
      localStorage.setItem(REACTION, "");
    }
    if (!selected) {
      ref.current.children[0].classList.add(className);
      ref.current.children[1].classList.add(className);
      setSelected(true);
      question(className);
      localStorage.setItem(SELECTED, true);
      localStorage.setItem(REACTION, className);
    }
  }

  function handleLikeClick() {
    handleReactionClick(likeRef, LIKE);
  }

  function handleDislikeClick() {
    handleReactionClick(dislikeRef, DISLIKE);
  }
  const getKey = localStorage.getItem(REACTION);

  return (
    <>
      <ReactionBox>
        <ThumbsIconTextBox
          className={LIKE}
          onClick={handleLikeClick}
          ref={likeRef}
        >
          <ThumbsUpSvg fill="#818181" className={getKey === LIKE ? LIKE : ""} />
          <ReactionText className={getKey === LIKE ? LIKE : ""}>
            좋아요 {selected ? (getKey === LIKE ? liked : "") : ""}
          </ReactionText>
        </ThumbsIconTextBox>
        <ThumbsIconTextBox
          className="dislike"
          onClick={handleDislikeClick}
          ref={dislikeRef}
        >
          <ThumbsDownSvg
            fill="#818181"
            className={getKey === DISLIKE ? DISLIKE : ""}
          />
          <ReactionText className={getKey === DISLIKE ? DISLIKE : ""}>
            싫어요 {selected ? (getKey === "dislike" ? disliked : "") : ""}
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
