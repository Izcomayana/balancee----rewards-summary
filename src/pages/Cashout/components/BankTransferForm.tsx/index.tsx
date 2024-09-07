import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader, MoreHorizontal, Copy, Eye } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  getMaxValue, updateMaxValue, getStoredMaxValue,
  getTransactions, updateTransactions, getStoredTransactions
} from "@/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    navigator.clipboard.writeText(text).then(() => {

      toast.success("Copied!", {
        description: "Transaction ID has been copied to clipboard.",
      });
    }).catch(() => {
      toast.error("Failed to copy", {
        description: "Please try again.",
      });
    });
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
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden md:table-cell">Bank Name</TableHead>
            <TableHead>Account Name</TableHead>
            <TableHead className="hidden md:table-cell">Account Number</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawals.map((withdrawal) => (
            <TableRow key={withdrawal.id}>
              <TableCell className="hidden md:table-cell">{withdrawal.bankName}</TableCell>
              <TableCell>{withdrawal.accountName}</TableCell>
              <TableCell className="hidden md:table-cell">{withdrawal.accountNumber}</TableCell>
              <TableCell>₦{parseInt(withdrawal.amount).toLocaleString()}</TableCell>
              <TableCell className="hidden md:table-cell">{withdrawal.date}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => copyToClipboard(withdrawal.id)}>
                      <Copy className="mr-2 h-4 w-4" /> Copy ID
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Transaction Details</AlertDialogTitle>
                          <AlertDialogDescription>
                            <div className="space-y-2">
                              <p><strong>ID:</strong> {withdrawal.id}</p>
                              <p><strong>Bank Name:</strong> {withdrawal.bankName}</p>
                              <p><strong>Account Name:</strong> {withdrawal.accountName}</p>
                              <p><strong>Account Number:</strong> {withdrawal.accountNumber}</p>
                              <p><strong>Amount:</strong> ₦{parseInt(withdrawal.amount).toLocaleString()}</p>
                              <p><strong>Date:</strong> {withdrawal.date}</p>
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction>Close</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
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
