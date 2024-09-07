import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WithdrawalTable from "./Cashout/components/BankTransferForm/components/WithdrawTable";
import {
  getMaxValue,
  getStoredMaxValue,
  getTransactions,
  updateTransactions,
  getStoredTransactions,
} from "@/constants";
import { Toaster, toast } from "sonner";
import { ViewDetailsAlert } from "./Cashout/components/BankTransferForm/components/Alerts";

interface Withdrawal {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  amount: string;
  date: string;
}

const Home = () => {
  const [max, setMax] = useState<number>(0);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [selectedWithdrawal, setSelectedWithdrawal] =
    useState<Withdrawal | null>(null);

  useEffect(() => {
    AOS.init();
    AOS.refresh();

    const fetchData = async () => {
      const storedMax = getStoredMaxValue();
      if (storedMax !== null) {
        setMax(storedMax);
      } else {
        const maxValue = await getMaxValue();
        setMax(maxValue);
      }

      const storedWithdrawals = getStoredTransactions();
      if (storedWithdrawals) {
        setWithdrawals(storedWithdrawals);
      } else {
        const transactions = await getTransactions();
        setWithdrawals(transactions);
        updateTransactions(transactions);
      }
    };

    fetchData();
  }, [max]);

  const handleViewDetails = (withdrawal: Withdrawal) => {
    setSelectedWithdrawal(withdrawal);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied!", {
          description: "Transaction ID has been copied to clipboard.",
        });
      })
      .catch(() => {
        toast.error("Failed to copy", {
          description: "Please try again.",
        });
      });
  };

  return (
    <motion.div exit={{ opacity: 0 }}>
      <Toaster />
      <main>
        <div className="container mx-auto px-4 pt-4 pb-20 md:h-screen lg:pt-10 xl:px-0">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-800 montserrat font-bold md:text-lg lg:text-xl">
              Earnings Overview
            </h1>

            <Link to="/History" className="underline text-sm md:text-base">
              View full history➭
            </Link>
          </div>

          <div className="flex flex-wrap gap-8 my-8">
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className="p-6 bg-white rounded-lg shadow-md w-full overflow-hidden hover:shadow-lg transition-shadow md:w-80"
            >
              <p className="font-medium text-sm">Total Earnings</p>
              <p className="mt-10 text-xl text-gray-800 font-bold lg:text-2xl">₦45,670</p>
              <span className="text-[10px] text-gray-700">
                +17.1% from last month
              </span>
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              className="p-6 bg-white rounded-lg shadow-md w-full overflow-hidden hover:shadow-lg transition-shadow md:w-80"
            >
              <p className="font-medium text-sm">Current Balance</p>
              <p className="mt-10 text-xl text-gray-800 font-bold lg:text-2xl">
                ₦{max.toLocaleString("en-US")}
              </p>
              <span className="text-[10px] text-gray-700">
                +27.5% from last month
              </span>
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              className="p-6 bg-white rounded-lg shadow-md w-full overflow-hidden hover:shadow-lg transition-shadow md:w-80"
            >
              <p className="font-medium text-sm">Total Bookings</p>
              <p className="mt-10 text-xl text-gray-800 font-bold lg:text-2xl">123+</p>
              <span className="text-[10px] text-gray-700">
                +10.1% from last month
              </span>
            </div>
          </div>

          <div className="my-10" data-aos="fade-up" data-aos-duration="1500">
            <WithdrawalTable
              withdrawals={withdrawals}
              copyToClipboard={copyToClipboard}
              onViewDetails={handleViewDetails}
            />

            <ViewDetailsAlert
              selectedWithdrawal={selectedWithdrawal}
              setSelectedWithdrawal={setSelectedWithdrawal}
            />
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Home;