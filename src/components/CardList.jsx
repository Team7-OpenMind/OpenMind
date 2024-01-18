import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Card from "./Card";

const dummyCards = Array(10).fill({
  id: 1,
  name: "아초는 고양이",
  imgaeSource: "https://picsum.photos/200/300",
  questionCount: 9,
  createAt: "2021-07-08",
  team: "팀1",
});

const CardStyled = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ff00ff;
  width: 100%;
  color: #000;
`;

export function CardList({ className, showCardCount, pageIndex, orderNew }) {
  const [cards, setCards] = useState([]);

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
        />
      );
    });
    console.log("cards " + tempCards);
    setCards(tempCards);
  }, [showCardCount, orderNew, pageIndex]);

  return <div className={className}>{cards}</div>;
}

export default CardList;
