import { useEffect, useState } from "react";

import styled from "styled-components";
import CardList from "components/CardList";

import logo from "assets/logo.svg";
import Dropdown from "components/userCard/Dropdown";
import Button from "components/button/Button";
import Arrow from "assets/Arrow.svg";
import { copyClipboard } from "utils/share";
import { Toast } from "components/toast/toast";

const ListStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 327px;
  background-color: #f9f9f9; // TODO : change color variable
  padding-left: 24px; // TODO : change max(24px, ??)
  padding-right: 24px; // TODO : change max(24px, ??)

  > * {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
  }

  @media screen and (min-width: 768px) {
    padding-left: minmax(32px, auto);
    padding-right: minmax(32px, auto);
  }
`;

const ListTop = styled.div`
  margin-bottom: 52px;

  > img {
    width: 146px;
    margin-bottom: 20px;
  }

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 26px;
    padding-right: 26px;
    margin-bottom: 40px;
  }
`;

const ListMid = styled.div``;

const ListBot = styled.div``;

const AnswerButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  line-height: 18px; /* 128.571% */
  color: var(--Brown-40, #542f1a);
  padding: 8px 12px;
  gap: 4px;

  border-radius: 8px;
  border: 1px solid var(--Brown-40);
  background: var(--Brown-10);

  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

const FilterStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;

  width: 100%;
  height: auto;

  > div {
    color: var(--Grayscale-60, #000);
    text-align: center;
    font-family: "Black Han Sans";
    font-size: 24px;
    font-weight: 400;

    @media screen and (min-width: 768px) {
      font-size: 40px;
    }
  }

  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    gap: 12px;
  }
`;

const CardListStyled = styled(CardList)`
  position: relative;

  display: grid;
  grid-template-columns: repeat(2, minmax(154px, 220px));

  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;

  text-align: center;

  @media screen and (min-width: 768px) {
    grid-template-columns: ${(props) =>
      props.isShowMore
        ? "repeat(4, minmax(186px,220px))"
        : "repeat(3, minmax(186px,1fr))"};
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, 220px);
  }
`;

export function List() {
  const [showCardCount, setShowCardCount] = useState(8); // Info : 6 ~ 8개씩 보여줌
  const [pageIndex, setPageIndex] = useState(1); // Info : 1부터 시작
  const [orderNew, setOrderNew] = useState(true);
  const [toastMsg, setToastMsg] = useState("");

  function onSelectOrder(key) {
    setOrderNew("최신순" === key);
  }

  function onShowMore(flag) {
    if (flag) setShowCardCount(8);
    else setShowCardCount(6);
  }

  function onResize(e) {
    if (e.target.innerWidth > 1200) setShowCardCount(8);
  }

  function onClickLogo() {}

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [showCardCount]);

  return (
    <ListStyled>
      <ListTop>
        <img src={logo} alt="logo" onClick={onClickLogo} />
        <AnswerButton>
          <div>답변하러 가기</div>
          <img src={Arrow} />
        </AnswerButton>
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
          isShowMore={showCardCount === 8}
          onShowMore={onShowMore}
        />
      </ListMid>
      <ListBot>
        <div>카드 리스트 인덱스</div>
      </ListBot>
      <Toast msg={toastMsg} />
    </ListStyled>
  );
}

export default List;
