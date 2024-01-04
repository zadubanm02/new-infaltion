"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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

  const PaginationComponent = ({
    nextPage,
    count,
  }: {
    nextPage: boolean;
    count?: number;
  }) => (
    <Pagination>
      <PaginationContent>
        {currentPage > 0 && (
          <PaginationItem
            className="cursor-pointer"
            onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
          >
            <PaginationPrevious />
          </PaginationItem>
        )}
        <PaginationItem className="cursor-pointer">
          <PaginationLink>{currentPage + 1}</PaginationLink>
        </PaginationItem>
        {nextPage && (
          <PaginationItem
            className="cursor-pointer"
            onClick={() => nextPage && setCurrentPage(currentPage + 1)}
          >
            <PaginationNext />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );

  return {
    currentPage,
    PaginationComponent,
    resetPage,
    limit,
    offset,
  };
};

export default usePagination;
