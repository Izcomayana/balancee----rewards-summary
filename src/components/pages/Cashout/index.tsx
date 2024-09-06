import React from "react";
import { CashoutOptions } from "@/components/cashoutOptions";
// import { CashoutOptions2 } from "@/components/cashoutOption2";
import { Card } from "@/components/ui/card";

const Cashout: React.FC = () => {
  const min = 100;

  return (
    <main>
      <div className="container mx-auto px-4 my-4 lg:my-10 xl:px-0">
        <div className="flex justify-between items-center">
          <h1 className="text-gray-800 text-xl montserrat font-bold md:text-2xl">
            Cash Out Your Rewards
          </h1>
        </div>

        <div className="my-10">
          <Card className="p-6 w-full max-w-2xl mx-auto lg:mx-0">
            <div className="flex justify-between items-center">
              <p className="font-medium text-xl">Available balance</p>
            </div>

            <p className="mt-10 text-2xl text-gray-800 font-bold">₦21, 200</p>
            <span className="text-xs text-gray-700">min cash out: ₦{min}</span>
          </Card>
        </div>

        <div className="">
          <CashoutOptions />
          {/* <CashoutOptions2 /> */}
        </div>
      </div>
    </main>
  );
};

export default Cashout;
