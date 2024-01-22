import thumbsUpSvg from "../assets/thumbs-up.svg";
import thumbsDownSvg from "../assets/thumbs-down.svg";
import styled from "styled-components";
import { useState } from "react";
//Todo: 폰트관련 속성 나중에 rem으로 변경
const ReactionBox = styled.span`
  display: flex;
  gap: 32px;
`;

const ThumbsIconTextBox = styled.div`
  display: flex;
  gap: 6px;
`;

const ReactionIcon = styled.img``;
const ReactionText = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
`;

function Reaction() {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  function handleLikeClick() {
    setLikeCount((prev) => prev + 1);
  }

  function handleDislikeClick() {
    setDislikeCount((prev) => prev + 1);
  }
  return (
    <>
      <ReactionBox>
        <ThumbsIconTextBox onClick={handleLikeClick}>
          <ReactionIcon src={thumbsUpSvg} />
          <ReactionText>좋아요 {likeCount}</ReactionText>
        </ThumbsIconTextBox>
        <ThumbsIconTextBox onClick={handleDislikeClick}>
          <ReactionIcon src={thumbsDownSvg} />
          <ReactionText>싫어요 {dislikeCount}</ReactionText>
        </ThumbsIconTextBox>
      </ReactionBox>
    </>
  );
}

export default Reaction;
