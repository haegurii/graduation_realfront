export const returnPaginationRange = (totalPage, page, limit, siblings) => {
  let totalPageNoInArray = 7 + siblings;

  function makeRangeArray(start, end) {
    let arr = [];
    for (let i = start; i < end; i++) {
      arr.push(i);
    }

    return arr;
  }
  if (totalPageNoInArray >= totalPage) {
    return makeRangeArray(1, totalPage + 1);
  }

  let leftSiblingsIndex = Math.max(page - siblings, 1);
  let rightSiblingsIndex = Math.min(page + siblings, totalPage);

  let showLeftDots = leftSiblingsIndex > 2;
  let showRightDots = rightSiblingsIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    let leftItemsCount = 3 + 2 * siblings;
    let leftRange = makeRangeArray(1, leftItemsCount + 1);

    return [...leftRange, " ...", totalPage];
  } else if (showLeftDots && !showRightDots) {
    let rightIttemsCount = 3 + 2 * siblings;
    let rightRange = makeRangeArray(
      totalPage - rightIttemsCount + 1,
      totalPage + 1
    );
    return [1, "... ", ...rightRange];
  } else {
    let middleRange = makeRangeArray(leftSiblingsIndex, rightSiblingsIndex + 1);
    return [1, " ...", ...middleRange, "... ", totalPage];
  }
};
