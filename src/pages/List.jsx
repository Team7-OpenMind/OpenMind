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

const FilterStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > p {
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ff00ff;
  width: 80%;
  color: #ff0aaa;

  text-align: center;
`;

export function List() {
  const [orderNew, setOrderNew] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    console.log("TODO : 질문 목록 아이템 정렬");
  }, [orderNew]);

  return (
    <ListStyled>
      <section>
        <img src={logo} alt="logo" />
        <div>답변하러가기 ＞</div>
      </section>
      <section>
        <FilterStyled>
          <p>누구에게 질문할까요?</p>
          <Dropdown items={["이름순", "최신순"]} />
        </FilterStyled>
        <div>
          <CardListStyled orderNew={orderNew} pageIndex={pageIndex} />
        </div>
      </section>
      <section>
        <div>카드 리스트 인덱스</div>
      </section>
    </ListStyled>
  );
}

export default List;
