import { subjectListUrl } from "api/questionApi";
import { PAGE_LIMIT, getCurrentPageArray } from "utils/pagination";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import useQuery from "hooks/useQuery";
import styled from "styled-components";
import PrevButton from "./button/PrevButton";
import NextButton from "./button/NextButton";

function Pagination({ initPage, onClick }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const [page, setPage] = useState(pageParam >= 1 ? pageParam : initPage);
  const offset = (page - 1) * PAGE_LIMIT;
  const { data } = useQuery(subjectListUrl(PAGE_LIMIT, offset));

  if (!data) return;
  const { count, next, previous } = data;
  const currentPageArray = getCurrentPageArray(page, count);

  const handlePrevClick = () => {
    console.log(previous);
  };
  const handleNextClick = () => {
    console.log(next);
  };

  return (
    <PaginationWrapper>
      <PrevButton onClick={handlePrevClick} disabled={previous === null} />
      <PageButtonWraaper>
        {currentPageArray &&
          currentPageArray.map((idx) => (
            <PageButton
              key={idx}
              pageIndex={idx}
              onClick={onClick}
              page={page}
            />
          ))}
      </PageButtonWraaper>
      <NextButton onClick={handleNextClick} disabled={next === null} />
    </PaginationWrapper>
  );
}

function PageIndex({ className, pageIndex, onClick, page }) {
  const isNow = page == pageIndex;
  const handlePageClick = () => {
    onClick(pageIndex);
    console.log(pageIndex);
  };
  return (
    <button
      className={`${className} ${isNow ? "now" : ""}`}
      onClick={handlePageClick}
      disabled={isNow}
    >
      {pageIndex}
    </button>
  );
}

const PaginationWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PageButtonWraaper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const PageButton = styled(PageIndex)`
  padding: 7.5px 14px;
  cursor: pointer;
  color: var(--Grayscale-40);

  &:hover,
  :active {
    color: var(--Brown-40);
  }
  &.now {
    cursor: default;
    color: var(--Brown-40);
  }
`;

export default Pagination;
