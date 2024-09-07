import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { getMaxValue, getStoredMaxValue } from "@/constants";

const Balance = () => {
  const [max, setMax] = useState<number>(0);

  useEffect(() => {
    AOS.init();
    AOS.refresh();

    const storedMax = getStoredMaxValue();
    if (storedMax !== null) {
      setMax(storedMax);
    } else {
      const fetchMax = async () => {
        const maxValue = await getMaxValue();
        setMax(maxValue);
      };
      fetchMax();
    }
  }, [max]);

  return (
    <>
      <Dialog>
        <div
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1000"
        >
          <div className="p-6 bg-white rounded-lg shadow-md w-full overflow-hidden hover:shadow-lg transition-shadow md:w-[35rem]">
            <div className="flex justify-between items-center">
              <p className="font-medium lg:text-lg">Balance</p>
              <DialogTrigger asChild>
                <p className="underline border-none cursor-pointer text-sm">
                  how to use
                </p>
              </DialogTrigger>
            </div>

            <p className="mt-6 text-lg text-gray-800 font-bold lg:text-xl">
              ₦{max.toLocaleString("en-US")}
            </p>
            <span className="text-[10px] text-gray-700">
              +27.5% from last month
            </span>
          </div>
        </div>

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="montserrat text-lg font-semibold md:text-xl">
              Cashout Methods:
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="mt-4">
              <p className="text-sm text-gray-700 md:text-base">
                <b>Direct Cashout: </b>
                An option for you to withdraw your cashback earnings directly to
                your bank account or as a discount on future bookings.
              </p>
            </div>
            <br />
            <div>
              <p className="text-sm text-gray-700 md:text-base">
                <b>Promo Codes: </b>
                You can choose to convert your cashback into promo codes which
                you can apply to future bookings.
              </p>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Balance;
