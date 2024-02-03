import { subjectListUrl } from "api/questionApi";
import { getCurrentPageArray } from "utils/pagination";
import { useSearchParams } from "react-router-dom";
import useQuery from "hooks/useQuery";
import styled from "styled-components";
import PrevButton from "./button/PrevButton";
import NextButton from "./button/NextButton";

function Pagination({ showCardCount: limit, initPage, onClick }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const orderParam = searchParams.get("order");
  const page = Number(pageParam >= 1 ? pageParam : initPage);
  const offset = (page - 1) * limit;
  const { data } = useQuery(subjectListUrl(limit, offset, orderParam), {
    data: [],
  });

  const { count, next, previous } = data;
  const currentPageArray = getCurrentPageArray(page, count, limit);

  const handlePageClick = (pageIndex) => {
    onClick(pageIndex);
    setSearchParams((prevSearchParams) => {
      prevSearchParams.set("page", pageIndex);
      return new URLSearchParams(prevSearchParams);
    });
  };

  const handlePrevClick = () => {
    handlePageClick(page - 1);
  };

  const handleNextClick = () => {
    handlePageClick(page + 1);
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
              onClick={handlePageClick}
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

  const handleClick = () => {
    onClick(pageIndex);
  };

  return (
    <button
      className={`${className} ${isNow ? "now" : ""}`}
      onClick={handleClick}
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
