import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getMaxValue, updateMaxValue, getStoredMaxValue  } from "@/constants/max";

const FutureBookingForm = () => {
  const [bookingId, setBookingId] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<string>("");
  const [isDiscountFormValid, setIsDiscountFormValid] =
    useState<boolean>(false);
  const [isBookingSubmitting, setIsBookingSubmitting] =
    useState<boolean>(false);
  const [showDiscountAlert, setShowDiscountAlert] = useState<boolean>(false);
  const [max, setMax] = useState<number>(0);
  const min = 100;

  useEffect(() => {
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
    
    const isBookingValid =
      parseInt(discountAmount.replace(/,/g, ""), 10) >= min &&
      parseInt(discountAmount.replace(/,/g, ""), 10) <= max;
    setIsDiscountFormValid(bookingId.length === 5 && isBookingValid);
  }, [bookingId, discountAmount, max]);

  const handleBookingSubmit = () => {
    const withdrawalAmount = parseInt(discountAmount.replace(/,/g, ""), 10);
    
    setIsBookingSubmitting(true);
      const newMax = max - withdrawalAmount;
      updateMaxValue(newMax); 
      setMax(newMax);
      setTimeout(() => {
      setIsBookingSubmitting(false);
      setBookingId("");
      setDiscountAmount("");
      setShowDiscountAlert(true);
    }, 3500);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="booking-id">Booking ID</Label>
        <Input
          id="booking-id"
          type="text"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value.slice(0, 5))}
          placeholder="Enter your booking ID"
          maxLength={5}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="discount-amount">
          Discount Amount (₦{min.toLocaleString()} - ₦{max.toLocaleString()})
        </Label>
        <Input
          id="discount-amount"
          value={discountAmount}
          onChange={(e) => setDiscountAmount(e.target.value)}
          placeholder={`Enter amount to discount on your next booking (₦${min.toLocaleString()} - ₦${max.toLocaleString()})`}
        />
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

      <AlertDialog open={showDiscountAlert} onOpenChange={setShowDiscountAlert}>
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
    </div>
  );
};

export default FutureBookingForm;
