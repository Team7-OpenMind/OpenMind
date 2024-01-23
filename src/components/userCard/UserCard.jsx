import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import message from "assets/Messages.svg";

const ProfileContainer = styled.div``;

const ProfileImage = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 12px;

  > img {
    width: 100%;
    height: 100%;
  }
`;

const ProfileName = styled.div`
  color: var(--Grayscale-60);
  font-family: Actor; // TODO : add font
  font-size: 18px;
  font-weight: 400;
  line-height: 24px; /* 133.333% */
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  > div {
    color: var(--Grayscale-40);
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px; /* 128.571% */
  }
`;

const QuestionTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 4px;

  > img {
    width: 16px;
    height: 16px;
  }

  > div {
    color: var(--Grayscale-40);
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px; /* 128.571% */
  }
`;

export function UserCard({
  className,
  name,
  imageSource,
  questionCount,
  onClick,
  onShowMore,
}) {
  const cardRef = useRef(null);

  function onMouseOver(e) {
    const element = cardRef?.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = element.offsetWidth;
    const height = element.offsetHeight;

    const midX = width / 2;
    const midY = height / 2;

    const angleX = (x - midX) / midX;
    const angleY = (y - midY) / midY;

    const rotateY = angleX * 15;
    const rotateX = angleY * -15;

    element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    element.style.boxShadow = `${angleX * -3}px ${angleY * -3}px 6px 3px rgba(0, 0, 0, 0.1)`;
  }

  function onMouseOut() {
    const element = cardRef?.current;
    if (!element) return;

    element.style.transform = `rotateX(0deg) rotateY(0deg)`;
    element.style.boxShadow = `0px 0px 0px 0px rgba(0, 0, 0, 0.1)`;
  }

  useEffect(() => {
    const element = cardRef?.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width === 0) return;

        if (entry.contentRect.width > 280 - 32) {
          // FIXME : change magic number
          // TODO : change Card List Layout( show 8 Cards )
          onShowMore(true);
          return;
        }
        if (entry.contentRect.width < 186 - 32) {
          // TODO : change Card List Layout( show 6 Cards )
          onShowMore(false);
          return;
        }
      }
    });
    observer.observe(element);

    element.addEventListener("mouseover", onMouseOver);
    element.addEventListener("mouseout", onMouseOut);
    element.addEventListener("mousemove", onMouseOver);

    return () => {
      observer.unobserve(element);

      element.removeEventListener("mouseover", onMouseOver);
      element.removeEventListener("mouseout", onMouseOut);
      element.removeEventListener("mousemove", onMouseOver);
    };
  }, []);

  return (
    <div className={className} ref={cardRef} onClick={onClick}>
      <ProfileContainer>
        <ProfileImage>
          <img src={imageSource} alt="profile" />
        </ProfileImage>
        <ProfileName>{name}</ProfileName>
      </ProfileContainer>

      <QuestionContainer>
        <QuestionTitle>
          <img src={message} />
          <div>받은질문</div>
        </QuestionTitle>
        <div>{questionCount}개</div>
      </QuestionContainer>
    </div>
  );
}

export default UserCard;
