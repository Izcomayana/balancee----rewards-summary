import { useState, useEffect } from "react";
import FormField from "./components/FormFields";
import WithdrawalTable from "./components/WithdrawTable";
import { BankAlert, ViewDetailsAlert } from "./components/Alerts";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import {
  getMaxValue,
  updateMaxValue,
  getStoredMaxValue,
  getTransactions,
  updateTransactions,
  getStoredTransactions,
} from "@/constants";
import { toast } from "sonner";

interface Withdrawal {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  amount: string;
  date: string;
}

const BankTransferForm = () => {
  const [bankName, setBankName] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [cashoutAmount, setCashoutAmount] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showBankAlert, setShowBankAlert] = useState<boolean>(false);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [selectedWithdrawal, setSelectedWithdrawal] =
    useState<Withdrawal | null>(null);
  const [max, setMax] = useState<number>(0);

  const min = 50;

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const isAmountValid =
      parseInt(cashoutAmount.replace(/,/g, ""), 10) >= min &&
      parseInt(cashoutAmount.replace(/,/g, ""), 10) <= max;
    setIsFormValid(
      bankName.trim() !== "" &&
        accountName.trim() !== "" &&
        accountNumber.length === 10 &&
        isAmountValid,
    );
  }, [accountName, accountNumber, bankName, cashoutAmount, max]);

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleSubmit = () => {
    const withdrawalAmount = parseInt(cashoutAmount.replace(/,/g, ""), 10);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const newWithdrawal: Withdrawal = {
        id: generateId(),
        bankName,
        accountName,
        accountNumber,
        amount: cashoutAmount,
        date: new Date().toLocaleString(),
      };

      const updatedWithdrawals = [...withdrawals, newWithdrawal];
      setWithdrawals(updatedWithdrawals);

      updateTransactions(updatedWithdrawals);

      const newMax = max - withdrawalAmount;
      updateMaxValue(newMax);
      setMax(newMax);

      setBankName("");
      setAccountName("");
      setAccountNumber("");
      setCashoutAmount("");
      setShowBankAlert(true);
    }, 3500);
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

  const handleViewDetails = (withdrawal: Withdrawal) => {
    setSelectedWithdrawal(withdrawal);
  };

  return (
    <div className="space-y-4">
      <FormField
        id="bankName"
        label="Bank Name"
        type="text"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
        placeholder="Enter your bank name"
      />
      <FormField
        id="accountName"
        label="Account Name"
        type="text"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
        placeholder="Enter your account name"
      />
      <FormField
        id="account"
        label="Account Number"
        type="text"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value.slice(0, 10))}
        placeholder="Enter your account number"
        maxLength={10}
      />{" "}
      {accountNumber.length > 0 && accountNumber.length < 10 && (
        <p className="text-sm text-red-500">
          Account number must be exactly 10 digits
        </p>
      )}
      <FormField
        id="amount"
        label={`Withdraw Amount (₦${min.toLocaleString()} - ₦${max.toLocaleString()})`}
        type="text"
        value={cashoutAmount}
        onChange={(e) => setCashoutAmount(e.target.value)}
        placeholder={`Enter amount to withdraw (₦${min.toLocaleString()} - ₦${max.toLocaleString()})`}
      />
      {cashoutAmount && (
        <p className="text-sm text-muted-foreground">
          You can only cash out between ₦{min.toLocaleString()} and ₦ ₦
          {max.toLocaleString()}.
        </p>
      )}
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
      {max < min && (
        <p className="text-red-500">You cannot withdraw. Max limit reached.</p>
      )}
      <WithdrawalTable
        withdrawals={withdrawals}
        copyToClipboard={copyToClipboard}
        onViewDetails={handleViewDetails}
      />
      <BankAlert
        showBankAlert={showBankAlert}
        setShowBankAlert={setShowBankAlert}
      />
      <ViewDetailsAlert
        selectedWithdrawal={selectedWithdrawal}
        setSelectedWithdrawal={setSelectedWithdrawal}
      />
    </div>
  );
};

export default BankTransferForm;
