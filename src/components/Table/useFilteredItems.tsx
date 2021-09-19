import { useState, useMemo } from "react";
import { matchSorter } from "match-sorter";
import { useDebouncedValue } from "./useDebounce";

export const useFilteredItemsByText = (allItems: any, properties = []) => {
  const [filterText, setFilterText] = useState("");

  const debouncedFilterText = useDebouncedValue(filterText, 250);
  const propertiesKey = (properties || []).join(",");

  const filteredItems = useMemo(() => {
    if (allItems && allItems.length) {
      if (!properties.length) {
        return allItems;
      }

      const items = matchSorter(allItems, debouncedFilterText, {
        keys: properties,
        threshold: matchSorter.rankings.CONTAINS,
      });

      return items;
    }

    return [];
  }, [allItems, debouncedFilterText, propertiesKey]);

  return {
    filterText,
    setFilterText,
    filteredItems,
  };
};
