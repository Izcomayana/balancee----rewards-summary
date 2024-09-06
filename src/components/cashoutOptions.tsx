"use client";

import { useEffect, useState } from "react";
import { Wallet, Tag, ArrowLeft, Copy, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Toaster, toast } from "sonner";
import AOS from "aos";
import "aos/dist/aos.css";

export function CashoutOptions() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [cashoutMethod, setCashoutMethod] = useState<string>("bank");
  const [promoCode, setPromoCode] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [cashoutAmount, setCashoutAmount] = useState<string>("");
  const [bookingId, setBookingId] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isDiscountFormValid, setIsDiscountFormValid] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isBookingSubmitting, setIsBookingSubmitting] =
    useState<boolean>(false);
  const [showBankAlert, setShowBankAlert] = useState(false);
  const [showDiscountAlert, setShowDiscountAlert] = useState(false);
  // const [max, setMax] = useState(21200);
  // const [min, setMin] = useState<number>(100);

  const max = 21200;
  const min = 100;

  const formatNumber = (value: number) => {
    return value.toLocaleString("en-US");
  };

  const generatePromoCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setPromoCode(code);
  };

  const handlePromoCode = () => {
    navigator.clipboard.writeText(promoCode);
    setPromoCode("");
    toast.success("Copied!.");
  };

  const handleAccountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 10);
    setAccountNumber(value.replace(/\D/g, ""));
  };

  const handleBookingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idValue = e.target.value.slice(0, 5);
    setBookingId(idValue.replace(/\D/g, ""));
  };

  const handleCashoutInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(parseInt(value, 10))) {
      setCashoutAmount(value);
    }
  };

  const handleDiscountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const disValue = e.target.value.replace(/,/g, "");
    if (!isNaN(parseInt(disValue, 10))) {
      setDiscountAmount(disValue);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setAccountNumber("");
      setCashoutAmount("");
      setShowBankAlert(true);
    }, 3500);
    // setMax(max - cashoutAmount);
  };

  const handleBookingSubmit = () => {
    setIsBookingSubmitting(true);
    setTimeout(() => {
      setIsBookingSubmitting(false);
      setBookingId("");
      setDiscountAmount("");
      setShowDiscountAlert(true);
    }, 3500);
    // setMax(max - cashoutAmount);
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();

    const isAmountValid =
      parseInt(cashoutAmount.replace(/,/g, ""), 10) >= min &&
      parseInt(cashoutAmount.replace(/,/g, ""), 10) <= max;
    setIsFormValid(accountNumber.length === 10 && isAmountValid);

    const isBookingValid =
      parseInt(discountAmount.replace(/,/g, ""), 10) >= min &&
      parseInt(discountAmount.replace(/,/g, ""), 10) <= max;
    setIsDiscountFormValid(bookingId.length === 5 && isBookingValid);
  }, [accountNumber.length, bookingId, cashoutAmount, discountAmount, max]);

  const handleCashoutBlur = () => {
    const value = parseInt(cashoutAmount, 10);
    if (!isNaN(value)) {
      if (value >= min && value <= max) {
        setCashoutAmount(formatNumber(value));
      } else {
        setCashoutAmount("");
      }
    }
  };

  const handleDiscountBlur = () => {
    const value = parseInt(discountAmount, 10);
    if (!isNaN(value)) {
      if (value >= min && value <= max) {
        setDiscountAmount(formatNumber(value));
      } else {
        setDiscountAmount("");
      }
    }
  };

  const renderBankTransfer = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="account">Account Number</Label>
        <Input
          id="account"
          type="text"
          value={accountNumber}
          onChange={handleAccountInput}
          placeholder="Enter your account number"
          maxLength={10}
          required
        />
        {accountNumber.length > 0 && accountNumber.length < 10 && (
          <p className="text-sm text-red-500">
            Account number must be exactly 10 digits
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">
          Cashout Amount (₦{formatNumber(min)} - ₦{formatNumber(max)})
        </Label>
        <Input
          id="amount"
          type="text"
          value={cashoutAmount}
          onChange={handleCashoutInput}
          onBlur={handleCashoutBlur} // Format on blur
          placeholder={`Enter amount to cashout (₦${formatNumber(
            min,
          )} - ₦${formatNumber(max)})`}
        />
        {cashoutAmount && (
          <p className="text-sm text-muted-foreground">
            You can cash out between ₦{formatNumber(min)} and ₦
            {formatNumber(max)}.
          </p>
        )}
      </div>
      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" /> Processing...
          </>
        ) : (
          "Cashout"
        )}
      </Button>
    </>
  );

  const renderFutureBookingDiscount = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="booking-id">Booking ID</Label>
        <Input
          id="booking-id"
          type="text"
          value={bookingId}
          onChange={handleBookingInput}
          placeholder="Enter your booking ID"
          maxLength={5}
          required
        />
        {bookingId.length > 0 && bookingId.length < 5 && (
          <p className="text-sm text-red-500">
            Booking ID must be exactly 5 digits
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="discount-amount">
          Discount Amount (₦{formatNumber(min)} - ₦{formatNumber(max)})
        </Label>
        <Input
          id="discount-amount"
          value={discountAmount}
          onChange={handleDiscountInput}
          onBlur={handleDiscountBlur}
          placeholder={`Enter amount to discount on your next booking (₦${formatNumber(
            min,
          )} - ₦${formatNumber(max)})`}
        />
        {discountAmount && (
          <p className="text-sm text-muted-foreground">
            You can only set discount amount between ₦{formatNumber(min)} and ₦
            {formatNumber(max)}.
          </p>
        )}
      </div>
      <Button
        className="w-full"
        onClick={handleBookingSubmit}
        disabled={!isDiscountFormValid || isBookingSubmitting}
      >
        {isBookingSubmitting ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" /> Applying...
          </>
        ) : (
          "Apply Discount"
        )}
      </Button>
    </div>
  );

  const renderDirectCashout = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Direct Cashout</CardTitle>
        <CardDescription>Choose your cashout method</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup
          defaultValue="bank"
          onValueChange={(value) => setCashoutMethod(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bank" id="bank" />
            <Label htmlFor="bank">Bank Transfer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="future_booking" id="future_booking" />
            <Label htmlFor="future_booking">Discount on Future Booking</Label>
          </div>
        </RadioGroup>
        {cashoutMethod === "bank"
          ? renderBankTransfer()
          : renderFutureBookingDiscount()}
      </CardContent>
    </Card>
  );

  const renderPromoCode = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Promo Code</CardTitle>
        <CardDescription>
          Generate a promo code for future bookings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            value={promoCode}
            readOnly
            placeholder="Your promo code will appear here"
          />
          <Button
            size="icon"
            variant="outline"
            onClick={handlePromoCode}
            disabled={!promoCode}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={generatePromoCode} className="w-full">
          Generate Promo Code
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Valid for 30 days</p>
        <p className="text-sm font-medium">Value: ₦{formatNumber(max)}</p>
      </CardFooter>
    </Card>
  );

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto" data-aos="fade-up" data-aos-duration="2000">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Choose Your Cash-Out Method
          </CardTitle>
          <CardDescription className="text-center">
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
              {selectedOption === "direct"
                ? renderDirectCashout()
                : renderPromoCode()}
            </div>
          )}
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex justify-between flex-col md:flex-row">
          <p className="text-sm text-muted-foreground">
            Available Cashback: ₦{formatNumber(max)}
          </p>
          <Button variant="ghost">View Cashback History</Button>
        </CardFooter>

        <AlertDialog open={showBankAlert} onOpenChange={setShowBankAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bank Transfer Successful</AlertDialogTitle>
              <AlertDialogDescription>
                Your cashout request has been processed successfully. The funds
                should appear in your account within 3-5 business days.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowBankAlert(false)}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={showDiscountAlert}
          onOpenChange={setShowDiscountAlert}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Discount Applied Successfully</AlertDialogTitle>
              <AlertDialogDescription>
                Your discount has been successfully applied to your future
                booking. You'll see the updated price reflected in your booking
                details.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowDiscountAlert(false)}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Toaster />
      </Card>
    </>
  );
}
