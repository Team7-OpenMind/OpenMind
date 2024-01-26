export const PAGE_LIMIT = 8;
export const PAGE_ARRAY_LIMIT = 5;

export function getCurrentPageArray(currentPage, count) {
  currentPage = currentPage >= 1 ? currentPage : 1;
  const totalPage = calculateTotalPage(count);
  const startIndex = getStratIndex(currentPage);
  const length = getCurrentPageArrayLength(startIndex, currentPage, totalPage);

  const arr = length > 0 ? new Array(length).fill(0) : [];

  return arr.map((x, i) => {
    if (i < PAGE_ARRAY_LIMIT) {
      return startIndex + i;
    }
  });
}

function calculateTotalPage(count) {
  return Math.ceil(count / PAGE_LIMIT);
}

function getStratIndex(currentPage) {
  currentPage = currentPage >= 1 ? currentPage : 1;
  return (
    Math.floor((currentPage - 1) / PAGE_ARRAY_LIMIT) * PAGE_ARRAY_LIMIT + 1
  );
}

function getCurrentPageArrayLength(startIndex, currentPage, totalPage) {
  if (currentPage > totalPage) {
    return 0;
  }

  if (startIndex + PAGE_ARRAY_LIMIT - 1 <= totalPage) {
    return PAGE_ARRAY_LIMIT;
  } else {
    return totalPage - startIndex + 1;
  }
}
