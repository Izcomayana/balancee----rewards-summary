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
      className={`p-2 px-4 rounded-lg text-gray-700 ${
        currentPage === 1
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-gray-200 hover:bg-gray-400"
      }`}
      disabled={currentPage === 1}
    >
      Previous
    </button>
    <span className="text-gray-600">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
      className={`p-2 px-4 rounded-lg ${
        currentPage === totalPages
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-gray-200 hover:bg-gray-400"
      }`}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
);

export default Pagination;
