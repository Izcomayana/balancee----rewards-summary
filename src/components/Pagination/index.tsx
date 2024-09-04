import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePageChange }) => (
  <div className="flex justify-between items-center mt-4">
    <button
      onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
      className="p-2 px-4 bg-gray-300 rounded-lg"
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <span className="text-gray-600">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
      className="p-2 px-4 bg-gray-300 rounded-lg"
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
);

export default Pagination;
