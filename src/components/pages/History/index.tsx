import Balance from "@/components/Balance";
import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

type Transaction = {
  date: string;
  amountEarned: number;
  service: string;
  bookingId: string;
  earnings: boolean;
};

const History: React.FC = () => {
  const [rewards, setRewards] = useState<Transaction[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "name">(
    "newest",
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Transaction[]>("/data.json")
      .then((response) => {
        sortRewards(response.data, sortOrder);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the rewards data:", error);
        setLoading(false);
      });
  }, [sortOrder]);

  const sortRewards = (
    data: Transaction[],
    order: "newest" | "oldest" | "name",
  ) => {
    const sortedRewards = [...data].sort((a, b) => {
      switch (order) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "name":
          return a.service.localeCompare(b.service);
        default:
          return 0;
      }
    });
    setRewards(sortedRewards);
  };

  const handleSort = (order: "newest" | "oldest" | "name") => {
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredRewards = rewards.filter((reward) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      reward.service.toLowerCase().includes(searchLower) ||
      reward.bookingId.toLowerCase().includes(searchLower)
    );
  });

  const paginatedRewards = filteredRewards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredRewards.length / itemsPerPage);

  return (
    <main>
      <div className="container mx-auto px-4 my-4 lg:my-10 xl:px-0">
        <div className="flex justify-between items-center">
          <h1 className="text-gray-800 text-xl montserrat font-bold md:text-2xl">
            Cashback History
          </h1>
        </div>

        <div className="flex flex-col gap-8 my-8">
          <Balance />

          <div className="relative flex flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name, or booking ID"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />

            <div className="relative">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 border border-gray-300 w-fit cursor-pointer rounded-lg bg-white flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
                <span>Sort</span>
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <Button
                    onClick={() => handleSort("name")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Name
                  </Button>
                  <Button
                    onClick={() => handleSort("oldest")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Oldest
                  </Button>
                  <Button
                    onClick={() => handleSort("newest")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Newest
                  </Button>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : filteredRewards.length === 0 ? (
            <div className="flex justify-center items-center h-48">
              <p className="text-gray-600">No results found</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col bg-white rounded-lg w-full overflow-hidden">
                {paginatedRewards.map((reward, index) => (
                  <React.Fragment key={index}>
                    <div className="p-4 flex items-center bg-gray-50 hover:bg-gray-200 transition-all">
                      <div className="mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                          />
                        </svg>
                      </div>

                      <div className="flex flex-row justify-between w-full">
                        <div>
                          <p className="text-sm md:text-lg lg:text-lg">
                            {reward.service}
                          </p>
                          <p className="text-[8px] text-gray-400 md:text-[10px] lg:text-xs lg:mt-1">
                            {reward.bookingId}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-green-400 md:text-lg lg:text-lg">
                            +₦{reward.amountEarned}
                          </p>
                          <p className="text-[8px] text-gray-400 md:text-[10px] lg:text-xs lg:mt-1">
                            {reward.date}
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </React.Fragment>
                ))}
              </div>
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
                  onClick={() =>
                    handlePageChange(Math.min(currentPage + 1, totalPages))
                  }
                  className="p-2 px-4 bg-gray-300 rounded-lg"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default History;
