const { getCurrentPageArray } = require("./pagination");

const PAGE_LIMIT_MOBILE = 6;
const PAGE_LIMIT = 8;

/**
 * 페이지 리스트 길이 기본값
 * @PAGE_ARRAY_LIMIT = 5
 */
it("모바일에서 startIndex + PAGE_ARRAY_LIMIT < totalPage 를 만족하면 배열을 반환한다.", () => {
  const result1 = getCurrentPageArray(1, 26, PAGE_LIMIT_MOBILE);
  const result2 = getCurrentPageArray(1, 40, PAGE_LIMIT_MOBILE);
  const result3 = getCurrentPageArray(6, 45, PAGE_LIMIT_MOBILE);

  expect(result1).toStrictEqual([1, 2, 3, 4, 5]);
  expect(result2).toStrictEqual([1, 2, 3, 4, 5]);
  expect(result3).toStrictEqual([6, 7, 8]);
});

it("모바일에서 현재 페이지가 < totalPage 일 때 빈 배열을 반환한다.", () => {
  const result1 = getCurrentPageArray(10, 26, PAGE_LIMIT_MOBILE);

  expect(result1).toStrictEqual([]);
});

it("태블릿/PC에서 startIndex + PAGE_ARRAY_LIMIT < totalPage 를 만족하면 배열을 반환한다.", () => {
  const result1 = getCurrentPageArray(1, 26, PAGE_LIMIT);
  const result2 = getCurrentPageArray(1, 40, PAGE_LIMIT);
  const result3 = getCurrentPageArray(6, 50, PAGE_LIMIT);

  expect(result1).toStrictEqual([1, 2, 3, 4]);
  expect(result2).toStrictEqual([1, 2, 3, 4, 5]);
  expect(result3).toStrictEqual([6, 7]);
});

it("태블릿/PC에서 현재 페이지가 < totalPage 일 때 빈 배열을 반환한다.", () => {
  const result1 = getCurrentPageArray(10, 26, PAGE_LIMIT);

  expect(result1).toStrictEqual([]);
});

it("1 보다 작은 수를 입력하면 1 페이지와 같은 결과 값을 반환한다.", () => {
  const result1 = getCurrentPageArray(0, 26, PAGE_LIMIT_MOBILE);
  const result2 = getCurrentPageArray(-1, 26, PAGE_LIMIT_MOBILE);
  const result3 = getCurrentPageArray(0, 26, PAGE_LIMIT);
  const result4 = getCurrentPageArray(-5, 26, PAGE_LIMIT);

  expect(result1).toStrictEqual([1, 2, 3, 4, 5]);
  expect(result2).toStrictEqual([1, 2, 3, 4, 5]);
  expect(result3).toStrictEqual([1, 2, 3, 4]);
  expect(result4).toStrictEqual([1, 2, 3, 4]);
});
