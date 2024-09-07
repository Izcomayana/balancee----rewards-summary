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

const BankTransferForm = () => {
  const [bankName, setBankName] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [cashoutAmount, setCashoutAmount] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showBankAlert, setShowBankAlert] = useState<boolean>(false);
  const [max, setMax] = useState<number>(0);

  const min = 50;

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
    setIsFormValid(
      bankName.trim() !== "" &&
      accountName.trim() !== "" &&
      accountNumber.length === 10 &&
      isAmountValid
    );
  }, [accountName, accountNumber, bankName, cashoutAmount, max]);

  const handleSubmit = () => {
    const withdrawalAmount = parseInt(cashoutAmount.replace(/,/g, ""), 10);
    setIsSubmitting(true);

    setTimeout(() => {
      const newMax = max - withdrawalAmount;
      updateMaxValue(newMax); 
      setMax(newMax);
      setIsSubmitting(false);
      setBankName("");
      setAccountName("");
      setAccountNumber("");
      setCashoutAmount("");
      setShowBankAlert(true);
    }, 3500);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bankName">Bank Name</Label>
        <Input
          id="bankName"
          type="text"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          placeholder="Enter your bank name"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="accountName">Account Name</Label>
        <Input
          id="accountName"
          type="text"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="Enter your account name"
          required
        />
      </div>
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
          Withdraw Amount (₦{min.toLocaleString()} - ₦{max.toLocaleString()})
        </Label>
        <Input
          id="amount"
          type="text"
          value={cashoutAmount}
          onChange={(e) => setCashoutAmount(e.target.value)}
          placeholder={`Enter amount to withdraw (₦${min.toLocaleString()} - ₦${max.toLocaleString()})`}
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
          "Withdraw"
        )}
      </Button>

      {max < min && <p className="text-red-500">You cannot withdraw. Max limit reached.</p>}
      <AlertDialog open={showBankAlert} onOpenChange={setShowBankAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bank Transfer Successful</AlertDialogTitle>
            <AlertDialogDescription>
              Your cashout request has been processed successfully. The funds
              should appear in your account within 1-3 business days.
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
