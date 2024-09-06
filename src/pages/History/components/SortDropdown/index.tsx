import React from "react";
import { Button } from "@/components/ui/button";

type SortDropdownProps = {
  isDropdownOpen: boolean;
  handleSort: (order: "newest" | "oldest" | "name") => void;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SortDropdown: React.FC<SortDropdownProps> = ({ isDropdownOpen, handleSort, setIsDropdownOpen }) => (
  <div className="relative">
    <div
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="p-2 border border-gray-300 bg-transparent w-fit cursor-pointer rounded-lg flex items-center space-x-2"
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
      <div className="absolute right-0 top-12 w-48 bg-transparent border border-gray-300 rounded-lg shadow-lg z-10">
        <Button
          onClick={() => handleSort("name")}
          className="w-full bg-transparent text-gray-800 bg-white text-left px-4 py-2 hover:bg-gray-100"
        >
          Name
        </Button>
        <Button
          onClick={() => handleSort("oldest")}
          className="my-2 w-full bg-transparent text-gray-800 bg-white text-left px-4 py-2 hover:bg-gray-100"
        >
          Oldest
        </Button>
        <Button
          onClick={() => handleSort("newest")}
          className="w-full bg-transparent text-gray-800 bg-white text-left px-4 py-2 hover:bg-gray-100"
        >
          Newest
        </Button>
      </div>
    )}
  </div>
);

export default SortDropdown;
