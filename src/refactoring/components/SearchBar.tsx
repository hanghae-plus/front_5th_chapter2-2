import { useMemo } from "react";

import { debounce } from "../utils";

interface Props {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: Props) => {
  const debouncedSearch = useMemo(() => debounce(onSearch, 400), [onSearch]);

  return (
    <input
      type="text"
      placeholder="상품명을 검색하세요"
      onChange={(e) => debouncedSearch(e.target.value)}
      className="w-full p-2 border rounded mb-4"
    />
  );
};
