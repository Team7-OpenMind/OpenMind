import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import styled from "styled-components";
import UserCardList from "components/userCard/UserCardList";

import logo from "assets/logo.svg";
import Dropdown from "components/button/Dropdown";
import Button from "components/button/Button";
import Arrow from "assets/Arrow.svg";
import Pagination from "components/pagination/Pagination";

export function List() {
  const [showCardCount, setShowCardCount] = useState(8); // Info : 6 ~ 8개씩 보여줌
  const [pageIndex, setPageIndex] = useState(1); // Info : 1부터 시작
  const [searchParams, setSearchParams] = useSearchParams();
  const order = searchParams.get("order");
  const navigate = useNavigate();

  function onSelectOrder(key) {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("order", key === "최신순" ? "createdAt" : "name");
      return new URLSearchParams(prevSearchParams);
    });
  }

  function onShowMore(flag) {
    if (flag) setShowCardCount(8);
    else setShowCardCount(6);
  }

  function onResize(e) {
    if (e.target.innerWidth > 1200) {
      setShowCardCount(8);
    }
  }

  function onClickLogo() {
    navigate("/");
  }

  function onClickAnswer() {
    const subjectId = localStorage.getItem("subjectId");
    subjectId ? navigate(`/post/${subjectId}/answer`) : navigate("/");
  }

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
        <AnswerButton onClick={onClickAnswer}>
          <div>답변하러 가기</div>
          <img src={Arrow} />
        </AnswerButton>
      </ListTop>
      <ListMid>
        <FilterStyled>
          <div>누구에게 질문할까요?</div>
          <Dropdown items={["최신순", "이름순"]} onSelect={onSelectOrder} />
        </FilterStyled>
        <UserCardListStyled
          key={pageIndex}
          showCardCount={showCardCount}
          pageIndex={pageIndex}
          order={order}
          isShowMore={showCardCount === 8}
          onShowMore={onShowMore}
        />
      </ListMid>
      <ListBot>
        <Pagination
          showCardCount={showCardCount}
          initPage={pageIndex}
          onClick={setPageIndex}
        />
      </ListBot>
    </ListStyled>
  );
}

export default List;

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

    &:hover {
      cursor: pointer;
    }
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
  line-height: 18px;
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

const UserCardListStyled = styled(UserCardList)`
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
