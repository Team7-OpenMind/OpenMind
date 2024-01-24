import { ReactComponent as ThumbsUpSvg } from "../assets/thumbs-up.svg";
import { ReactComponent as ThumbsDownSvg } from "../assets/thumbs-down.svg";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { getQuestion, countReaction } from "../api/reactionApi";

import "./reaction.css";
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

const SELECTED = "selected";
const REACTION = "reaction";

function Reaction() {
  const question = async (reaction) => {
    const { id } = await getQuestion();
    console.log(id);
    countReaction(id, reaction);
  };

  const likeRef = useRef();
  const dislikeRef = useRef();
  // Todo: 질문에? 답변에? 좋아요 수 저장하는 거 해야함
  //Todo: 좋아요 수 카운트 한 거  저장하고 불러와서 렌더링 해주기
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [selected, setSelected] = useState(false);

  function handleReactionClick(ref, className, setterFunction) {
    if (!selected) {
      setterFunction((prev) => prev + 1);
      ref.current.children[0].classList.add(className);
      ref.current.children[1].classList.add(className);
      setSelected(true);
      question(className);
      localStorage.setItem(SELECTED, true);
      localStorage.setItem(REACTION, className);
    } else {
      return;
    }
  }

  function handleLikeClick() {
    handleReactionClick(likeRef, "like", setLikeCount);
  }

  function handleDislikeClick() {
    handleReactionClick(dislikeRef, "dislike", setDislikeCount);
  }

  const getKey = localStorage.getItem(REACTION);
  return (
    <>
      <ReactionBox>
        <ThumbsIconTextBox onClick={handleLikeClick} ref={likeRef}>
          <ThumbsUpSvg
            fill="#818181"
            className={getKey === "like" ? "like" : ""}
          />
          <ReactionText className={getKey === "like" ? "like" : ""}>
            좋아요 {likeCount}
          </ReactionText>
        </ThumbsIconTextBox>
        <ThumbsIconTextBox onClick={handleDislikeClick} ref={dislikeRef}>
          <ThumbsDownSvg
            fill="#818181"
            className={getKey === "dislike" ? "dislike" : ""}
          />
          <ReactionText className={getKey === "dislike" ? "dislike" : ""}>
            싫어요 {dislikeCount}
          </ReactionText>
        </ThumbsIconTextBox>
      </ReactionBox>
    </>
  );
}

export default Reaction;
