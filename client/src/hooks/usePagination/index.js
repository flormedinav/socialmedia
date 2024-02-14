import { useEffect, useState } from "react";

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const slicedData = data.slice(startIndex, endIndex);

    setPaginatedData(slicedData);
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [data, currentPage, itemsPerPage]);

  return {
    currentPage,
    paginatedData,
    totalPages,
    setCurrentPage,
  };
};

export default usePagination;
