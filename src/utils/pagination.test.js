const { getCurrentPageArray } = require("./pagination");

/**
 * @PAGE_ARRAY_LIMIT = 5
 */
it("startIndex + PAGE_ARRAY_LIMIT < totalPage 를 만족하면 배열을 반환한다.", () => {
  const result1 = getCurrentPageArray(1, 26);
  const result2 = getCurrentPageArray(1, 40);
  expect(result1).toStrictEqual([1, 2, 3, 4]);
  expect(result2).toStrictEqual([1, 2, 3, 4, 5]);
});

it("1 보다 작은 수를 입력하면 1을 입력한것과 같은 결과 값을 반환한다.", () => {
  const result = getCurrentPageArray(0, 26);
  expect(result).toStrictEqual([1, 2, 3, 4]);
});
