import React, { useState } from "react";
import styled from "styled-components";
import { subjectListUrl } from "api/questionApi";
import Loading from "components/loading/Loading";
import { CenteredContainer } from "components";
import useQuery from "hooks/useQuery";

import UserCard from "./UserCard";
import { useNavigate, useSearchParams } from "react-router-dom";

const UserCardStyled = styled(UserCard)`
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

  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.1s ease-in-out;

  @media screen and (min-width: 768px) {
    padding: 20px;
  }
`;

export function UserCardList({
  className,
  showCardCount,
  pageIndex,
  orderNew,
  onShowMore,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(showCardCount);
  const navigate = useNavigate();

  function handleClick(card) {
    navigate(`/post/${card.id}`);
  }

  function onShowMoreCallback(flag) {
    onShowMore(flag);
  }

  const limitParam = searchParams.get("limit");
  const offsetParam = searchParams.get("offset");

  if (offset != offsetParam) {
    setOffset(offsetParam);
  }
  if (limit != limitParam) {
    setLimit(limitParam);
  }

  const { data, isLoading } = useQuery(subjectListUrl(limit, offset), {
    data: [],
  });

  if (!data.results) return;

  data.results.sort((a, b) => {
    if (orderNew) {
      a.createAt - b.createAt;
    } else {
      a.name - b.name;
    }
  });

  // INFO : 필요 없을 수도 있음 (페이지네이션) url string query로 대체 가능
  const showCards = data.results.slice(
    (pageIndex - 1) * showCardCount,
    pageIndex * showCardCount,
  );

  // 카드 속성에 따라 카드 생성
  const resultCards = showCards.map((card) => {
    const { id, name, imageSource, questionCount } = card;
    return (
      <UserCardStyled
        key={id}
        name={name}
        imageSource={imageSource}
        questionCount={questionCount}
        onClick={() => handleClick(card)}
        onShowMore={onShowMoreCallback}
      />
    );
  });

  if (resultCards) return <div className={className}>{resultCards}</div>;
  else {
    if (isLoading) {
      return (
        <CenteredContainer>
          <Loading />
        </CenteredContainer>
      );
    } else {
      return <div className={className}>{}</div>;
    }
  }
}

export default UserCardList;