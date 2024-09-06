import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import Balance from "@/components/Balance";
import SortDropdown from "./components/SortDropdown";
import RewardItem from "./components/RewardItem";
import Pagination from "./components/Pagination";
import Loader from "@/components/Loader";

type Cashback = {
  date: string;
  amountEarned: number;
  service: string;
  bookingId: string;
  earnings: boolean;
};

const History: React.FC = () => {
  const [rewards, setRewards] = useState<Cashback[]>([]);
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
      .get<Cashback[]>("/data.json")
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
    data: Cashback[],
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
      <div className="container mx-auto px-4 py-4 pb-20 lg:PY-10 xl:px-0">
        <div className="flex justify-between items-center" >
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
              className="w-full p-2 bg-transparent border border-gray-300 rounded-lg"
            />

            <SortDropdown
              isDropdownOpen={isDropdownOpen}
              handleSort={handleSort}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          </div>

          {loading ? (
            <Loader />
          ) : filteredRewards.length === 0 ? (
            <div className="flex justify-center items-center h-48">
              <p className="text-gray-600">No results found</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col bg-transparent w-full space-y-3 overflow-hidden">
                {paginatedRewards.map((reward, index) => (
                  <React.Fragment key={index}>
                    <RewardItem reward={reward} />
                    {index < paginatedRewards.length - 1}
                  </React.Fragment>
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default History;
