import { subjectListUrl } from "api/questionApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CenteredContainer } from "components";
import styled from "styled-components";
import Loading from "components/loading/Loading";
import useQuery from "hooks/useQuery";

import UserCard from "./UserCard";

export function UserCardList({
  className,
  showCardCount: limit,
  pageIndex,
  orderNew,
  onShowMore,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = Number(pageParam >= 1 ? pageParam : pageIndex);
  const offset = (page - 1) * limit;
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(subjectListUrl(limit, offset), {
    data: [],
  });

  function handleClick(card) {
    navigate(`/post/${card.id}`);
  }

  function onShowMoreCallback(flag) {
    onShowMore(flag);
  }

  if (!data.results) return;

  data.results.sort((a, b) => {
    if (orderNew) {
      a.createAt - b.createAt;
    } else {
      a.name - b.name;
    }
  });

  const showCards = data.results.slice(0, limit);

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

export default UserCardList;
