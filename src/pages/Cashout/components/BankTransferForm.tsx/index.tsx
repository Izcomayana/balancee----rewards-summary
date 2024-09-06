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

const BankTransferForm = () => {
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [cashoutAmount, setCashoutAmount] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showBankAlert, setShowBankAlert] = useState<boolean>(false);

  const max = 21200;
  const min = 100;

  useEffect(() => {
    const isAmountValid =
      parseInt(cashoutAmount.replace(/,/g, ""), 10) >= min &&
      parseInt(cashoutAmount.replace(/,/g, ""), 10) <= max;
    setIsFormValid(accountNumber.length === 10 && isAmountValid);
  }, [accountNumber, cashoutAmount]);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setAccountNumber("");
      setCashoutAmount("");
      setShowBankAlert(true);
    }, 3500);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="account">Account Number</Label>
        <Input
          id="account"
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value.slice(0, 10))}
          placeholder="Enter your account number"
          maxLength={10}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">
          Cashout Amount (₦{min.toLocaleString()} - ₦{max.toLocaleString()})
        </Label>
        <Input
          id="amount"
          type="text"
          value={cashoutAmount}
          onChange={(e) => setCashoutAmount(e.target.value)}
          placeholder={`Enter amount to cashout (₦${min.toLocaleString()} - ₦${max.toLocaleString()})`}
        />
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
    </div>
  );
};

export default BankTransferForm;
