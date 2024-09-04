import Balance from "@/components/Balance";

const History = () => {
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

          <div className="flex flex-col gap-4 space-y-1 bg-white rounded-lg shadow-md w-full overflow-hidden">
            <div className="p-4 flex items-center hover:bg-gray-200 transition-all">
              <div className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-10"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div>
                  <p className="text-sm md:text-lg lg:text-lg">Repaired a tire</p>
                  <p className=" text-[8px] text-gray-400 md:text-[10px] lg:text-xs lg:mt-1">012GBT0</p>
                </div>
                <div>
                  <p className="text-sm text-green-400 md:text-lg lg:text-lg">₦800</p>
                  <p className="text-[8px] text-gray-400 md:text-[10px] lg:text-xs lg:mt-1">1 Sept 2024, 16.34</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default History;
