import { useState } from "react";

const useSearch = <T extends { text: string; meaning: string }>(data: T[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term (case-insensitive)
  const filteredData = data.filter(
    (item) =>
      item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
  };
};

export default useSearch;
