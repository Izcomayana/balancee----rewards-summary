import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";

interface BankAlertProps {
  showBankAlert: boolean;
  setShowBankAlert: (show: boolean) => void;
}

const BankAlert: React.FC<BankAlertProps> = ({
  showBankAlert,
  setShowBankAlert,
}) => (
  <AlertDialog open={showBankAlert} onOpenChange={setShowBankAlert}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Bank Transfer Successful</AlertDialogTitle>
        <AlertDialogDescription>
          Your cashout request has been processed successfully. The funds should
          appear in your account within 1-3 business days.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <Link to="/">
          <AlertDialogAction onClick={() => setShowBankAlert(false)}>
            OK
          </AlertDialogAction>
        </Link>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

interface Withdrawal {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  amount: string;
  date: string;
}

interface ViewDetailsAlertProps {
  selectedWithdrawal: Withdrawal | null;
  setSelectedWithdrawal: (withdrawal: Withdrawal | null) => void;
}

const ViewDetailsAlert: React.FC<ViewDetailsAlertProps> = ({
  selectedWithdrawal,
  setSelectedWithdrawal,
}) => (
  <AlertDialog
    open={!!selectedWithdrawal}
    onOpenChange={() => setSelectedWithdrawal(null)}
  >
    {selectedWithdrawal && (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Transaction Details</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="space-y-2">
              <p>
                <strong>ID:</strong> {selectedWithdrawal.id}
              </p>
              <p>
                <strong>Bank Name:</strong> {selectedWithdrawal.bankName}
              </p>
              <p>
                <strong>Account Name:</strong> {selectedWithdrawal.accountName}
              </p>
              <p>
                <strong>Account Number:</strong>{" "}
                {selectedWithdrawal.accountNumber}
              </p>
              <p>
                <strong>Amount:</strong> ₦
                {parseInt(selectedWithdrawal.amount).toLocaleString()}
              </p>
              <p>
                <strong>Date:</strong> {selectedWithdrawal.date}
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setSelectedWithdrawal(null)}>
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    )}
  </AlertDialog>
);

export { BankAlert, ViewDetailsAlert };
