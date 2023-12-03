"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 6;
  const [offset, setOffset] = useState(0);
  const resetPage = () => setCurrentPage(1);

  const calculateOffset = () => {
    const off = limit * currentPage;
    setOffset(off);
  };

  useEffect(() => {
    calculateOffset();
  }, [currentPage]);

  const Pagination = ({
    nextPage,
    count,
  }: {
    nextPage: boolean;
    count?: number;
  }) => (
    <div className="py-2 flex flex-row items-center justify-center gap-2">
      {count}

      {currentPage > 0 && (
        <Button
          variant="secondary"
          onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
        >
          Prev
        </Button>
      )}
      {currentPage > 0 && nextPage && <div>{currentPage}</div>}
      {nextPage && (
        <Button
          variant="secondary"
          onClick={() => nextPage && setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      )}
      {count}
    </div>
  );

  return {
    currentPage,
    Pagination,
    resetPage,
    limit,
    offset,
  };
};

export default usePagination;
