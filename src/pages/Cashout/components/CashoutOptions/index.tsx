"use client";
import { useEffect, useState } from "react";
import { Wallet, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DirectCashout from "../DirectCashout";
import PromoCode from "../Promocode";
import { Toaster } from "sonner";
import AOS from "aos";
import "aos/dist/aos.css";
import { getMaxValue, getStoredMaxValue } from "@/constants/index.ts";
import { Link } from "react-router-dom";

export default function CashoutOptions() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
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
      <Card
        className="w-full max-w-3xl mx-auto"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <CardHeader>
          <CardTitle className="text-lg font-bold text-center">
            Choose Your Cash-Out Method
          </CardTitle>
          <CardDescription className="text-center text-sm">
            Select how you'd like to receive your cashback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!selectedOption ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Card
                className="relative overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedOption("direct")}
              >
                <CardHeader className="pb-2">
                  <Wallet className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>Direct Cashout</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Withdraw your cashback directly to your bank account or use
                    it as a discount on future bookings.
                  </p>
                </CardContent>
                <div className="absolute top-0 right-0 p-2 bg-primary text-primary-foreground text-xs font-bold rounded-bl-lg">
                  Fast
                </div>
              </Card>

              <Card
                className="relative overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
                onClick={() => setSelectedOption("promo")}
              >
                <CardHeader className="pb-2">
                  <Tag className="w-8 h-8 mb-2 text-primary" />
                  <CardTitle>Promo Codes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Convert your cashback into promo codes which you can apply
                    to future bookings for extra savings.
                  </p>
                </CardContent>
                <div className="absolute top-0 right-0 p-2 bg-secondary text-secondary-foreground text-xs font-bold rounded-bl-lg">
                  More Value
                </div>
              </Card>
            </div>
          ) : (
            <div className="space-y-4">
              <Button
                variant="ghost"
                onClick={() => setSelectedOption(null)}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Options
              </Button>
              {selectedOption === "direct" ? <DirectCashout /> : <PromoCode />}
            </div>
          )}
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex justify-between flex-col md:flex-row">
          <p className="text-sm text-muted-foreground">
            Available Cashback: ₦{max.toLocaleString("en-US")}
          </p>
          <Link to="/History">
            <Button variant="ghost">View Cashback History</Button>
          </Link>
        </CardFooter>
        <Toaster />
      </Card>
    </>
  );
}
