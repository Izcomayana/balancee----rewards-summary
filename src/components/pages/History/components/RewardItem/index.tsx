import React from "react";

type RewardItemProps = {
  reward: {
    date: string;
    amountEarned: number;
    service: string;
    bookingId: string;
  };
};

const RewardItem: React.FC<RewardItemProps> = ({ reward }) => (
  <div className="p-4 flex items-center rounded-lg bg-gray-100 hover:bg-gray-300 transition-all">
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
        <p className="text-sm md:text-lg lg:text-lg">{reward.service}</p>
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
);

export default RewardItem;
