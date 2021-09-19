import { useState, useMemo, useEffect } from "react";

const normalizePage = (
  newPage: any,
  totalPages: any,
  enableWrapping = false
) => {
  if (newPage < 1) {
    return enableWrapping ? totalPages : 1;
  } else if (newPage > totalPages) {
    return enableWrapping ? 1 : totalPages;
  }

  return newPage;
};

export function usePagination(
  itemCount: any,
  pageSize: any,
  { initialPage = 1, enableWrapping = false }: any = {}
) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(itemCount / pageSize);

  const actions = useMemo(() => {
    return {
      goBack: () => {
        setCurrentPage((current: any) => {
          return normalizePage(current - 1, totalPages, enableWrapping);
        });
      },
      goForward: () => {
        setCurrentPage((current: any) => {
          return normalizePage(current + 1, totalPages, enableWrapping);
        });
      },
      goTo: (targetPage: any) => {
        setCurrentPage(normalizePage(targetPage, totalPages, enableWrapping));
      },
    };
  }, [setCurrentPage, totalPages, enableWrapping]);

  useEffect(() => {
    setCurrentPage((current: any) =>
      normalizePage(current, totalPages, enableWrapping)
    );
  }, [totalPages, enableWrapping]);

  return {
    currentPage,
    totalPages,
    ...actions,
  };
}

export const usePagedItems = function (
  allItems: any,
  pageSize = 10,
  { initialPage = 1, enableWrapping = false } = {}
) {
  const paging = usePagination(allItems.length, pageSize, initialPage);
  const startIndex =
    allItems.length <= pageSize ? 0 : paging.currentPage * pageSize - pageSize;
  let endIndex = startIndex + pageSize;
  let isWrapping = endIndex > allItems.length;

  let items = allItems.slice(startIndex, endIndex);
  if (enableWrapping && isWrapping) {
    items = [...items, ...allItems.slice(0, endIndex - allItems.length)];
  }

  return [items, paging];
};
