import { useState, useMemo, useEffect, useRef } from "react";
import { isNumber, orderBy } from "lodash";

const getStringValueForSort = (item: any, property: any) => {
  return (item[property] || "").toLowerCase();
};

const sortByString = (items: any, sortKey: any, sortDir: any) => {
  return orderBy(
    items,
    [
      (item: any) =>
        isNumber(item[sortKey])
          ? item[sortKey]
          : getStringValueForSort(item, sortKey),
    ],
    [sortDir]
  );
};

export const useSortedItems = (
  items: any,
  initial = {},
  sortItems = sortByString
) => {
  const sortItemsRef = useRef(sortItems);

  useEffect(() => {
    sortItemsRef.current = sortItems;
  }, [sortItems]);

  const [sort, setSort] = useState({
    sortDir: "asc",
    sortKey: "",
    ...initial,
  });

  const onSort = (newSortKey: any, newSortDir?: any) => {
    setSort({
      sortKey: newSortKey,
      sortDir: newSortDir || "asc",
    });
  };

  const sortedItems = useMemo(
    () => sortItemsRef.current(items, sort.sortKey, sort.sortDir),
    [items, sort]
  );

  return {
    sortedItems,
    onSort,
    ...sort,
  };
};
