import { useEffect, useState } from "react";
import styled from "styled-components";
import CardList from "components/CardList";

// styled component style이 적용이 안되는데 이유를 모르겠음
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
    <div>
      <section>
        <div>logo</div>
        <div>header_button</div>
      </section>
      <section>
        <div>filter</div>
        <div>
          <CardListStyled orderNew={orderNew} pageIndex={pageIndex} />
        </div>
      </section>
      <section>
        <div>카드 리스트 인덱스</div>
      </section>
    </div>
  );
}

export default List;
