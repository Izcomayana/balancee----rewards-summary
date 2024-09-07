import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { getMaxValue, updateMaxValue, getStoredMaxValue  } from "@/constants/max";

const PromoCode = () => {
  const [promoCode, setPromoCode] = useState<string>("");
  const [cashoutAmount, setCashoutAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  // const [showBankAlert, setShowBankAlert] = useState<boolean>(false);
  const [max, setMax] = useState<number>(0);

  const min = 50;

  const handlePromoCode = () => {
    navigator.clipboard.writeText(promoCode);
    toast.success("Copied!");
    setPromoCode("");
  };

  const handleSubmit = () => {
    const withdrawalAmount = parseInt(cashoutAmount.replace(/,/g, ""), 10);
    setIsSubmitting(true);

    setTimeout(() => {
      const newMax = max - withdrawalAmount;
      updateMaxValue(newMax); 
      setMax(newMax);
      setIsSubmitting(false);
      setCashoutAmount("");
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      setPromoCode(code);
      // setShowBankAlert(true);
    }, 3000);
  };

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

    const isAmountValid =
      parseInt(cashoutAmount.replace(/,/g, ""), 10) >= min &&
      parseInt(cashoutAmount.replace(/,/g, ""), 10) <= max;
    setIsFormValid(isAmountValid);
  }, [cashoutAmount, max]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Promo Code</CardTitle>
        <CardDescription>
          Generate a promo code for future bookings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="amount">
          Amount to Convert (₦{min.toLocaleString()} - ₦{max.toLocaleString()})
        </Label>
        <Input
          id="amount"
          type="text"
          value={cashoutAmount}
          onChange={(e) => setCashoutAmount(e.target.value)}
          placeholder={`Enter amount to convert (₦${min.toLocaleString()} - ₦${max.toLocaleString()})`}
        />
      </div>
      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" /> Generating...
          </>
        ) : (
          "Generate Promo Code"
        )}
      </Button>
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
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Valid for 30 days</p>
        <p className="text-sm font-medium">
          Value: ₦{max.toLocaleString("en-US")}
        </p>
      </CardFooter>
    </Card>
  );
};

export default PromoCode;
