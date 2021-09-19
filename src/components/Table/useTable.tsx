import { useFilteredItemsByText } from "./useFilteredItems";
import { usePagedItems } from "./usePagination";
import { useSortedItems } from "./useSorting";

export function useTable(
  allItems: any,
  { filterKeys = [], sortKey, sortDir, pageSize }: any
) {
  pageSize = pageSize || allItems.length;
  const { filteredItems, ...filtering } = useFilteredItemsByText(
    allItems,
    filterKeys
  );
  const { sortedItems, ...sorting } = useSortedItems(filteredItems, {
    sortKey,
    sortDir,
  });

  const [showingItems, paging] = usePagedItems(sortedItems, pageSize);

  const stats = {
    totalItems: allItems.length,
    start: (paging.currentPage - 1) * pageSize + 1,
    end: Math.min(paging.currentPage * pageSize, allItems.length),
  };

  return {
    showingItems,
    filtering,
    sorting,
    paging,
    stats,
  };
}
