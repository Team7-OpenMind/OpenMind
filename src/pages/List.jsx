import { useEffect, useState } from "react";
import styled from "styled-components";
import CardList from "components/CardList";

import logo from "assets/logo.svg";
import Dropdown from "components/userCard/Dropdown";

const ListStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 375px;
  background-color: #f9f9f9; // TODO : change color variable
  padding-left: 24px; // TODO : change max(24px, ??)
  padding-right: 24px; // TODO : change max(24px, ??)
`;

const ListTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const ListMid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const ListBot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const FilterStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  > div {
    color: var(--Grayscale-60, #000);
    text-align: center;
    font-family: Actor; // TODO : add font
    font-size: 24px;
    font-weight: 400;
    line-height: 30px; /* 125% */
  }
`;

const CardListStyled = styled(CardList)`
  position: relative;

  display: grid;
  grid-template-columns: repeat(2, 1fr);

  justify-content: center;
  align-items: center;
  width: 80%;
  color: #ff0aaa;
  gap: 8px;

  text-align: center;
`;

export function List() {
  const [showCardCount, setShowCardCount] = useState(6); // Info : 6 ~ 8개씩 보여줌
  const [pageIndex, setPageIndex] = useState(1); // Info : 1부터 시작
  const [orderNew, setOrderNew] = useState(true);

  function onSelectOrder(key) {
    setOrderNew("최신순" === key);
  }

  useEffect(() => {
    console.log("TODO : 질문 목록 아이템 정렬");
  }, [orderNew]);

  return (
    <ListStyled>
      <ListTop>
        <img src={logo} alt="logo" />
        <div>답변하러가기 ＞</div>
      </ListTop>
      <ListMid>
        <FilterStyled>
          <div>누구에게 질문할까요?</div>
          <Dropdown items={["이름순", "최신순"]} onSelect={onSelectOrder} />
        </FilterStyled>
        <CardListStyled
          showCardCount={showCardCount}
          pageIndex={pageIndex}
          orderNew={orderNew}
        />
      </ListMid>
      <ListBot>
        <div>카드 리스트 인덱스</div>
      </ListBot>
    </ListStyled>
  );
}

export default List;
