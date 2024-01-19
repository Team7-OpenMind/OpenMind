import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Card from "./Card";

const dummyCards = Array(10).fill({
  id: 1,
  name: "아초는 고양이",
  imageSource: "https://picsum.photos/200/300",
  questionCount: 9,
  createAt: "2021-07-08",
  team: "팀1",
});

const CardStyled = styled(Card)`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
  height: 187px;

  border-radius: 16px;
  border: 1px solid var(--Grayscale-40);
  background: var(--Grayscale-10);

  padding: 16px;

  transition: transform 0.3s ease-in-out;

  @media screen and (min-width: 768px) {
    padding: 20px;
  }
`;

export function CardList({
  className,
  showCardCount,
  pageIndex,
  orderNew,
  onShowMore,
}) {
  const [cards, setCards] = useState([]);

  function onShowMoreCallback(flag) {
    onShowMore(flag);
  }

  useEffect(() => {
    // 이름순 or 최신순으로 정렬
    dummyCards.sort((a, b) => {
      if (orderNew) {
        a.createAt - b.createAt;
      } else {
        a.name - b.name;
      }
    });
    console.log("dummy " + dummyCards.length);

    // page index에 해당하는 카드만 보여주기
    const showCards = dummyCards.slice(
      (pageIndex - 1) * showCardCount,
      pageIndex * showCardCount,
    );
    console.log("showCard " + showCards.length);

    // 카드 속성에 따라 카드 생성
    const tempCards = showCards.map((card) => {
      const { id, name, imageSource, questionCount } = card;
      return (
        <CardStyled
          key={id}
          name={name}
          imageSource={imageSource}
          questionCount={questionCount}
          onShowMore={onShowMoreCallback}
        />
      );
    });
    setCards(tempCards);
  }, [showCardCount, orderNew, pageIndex]);

  return <div className={className}>{cards}</div>;
}

export default CardList;
