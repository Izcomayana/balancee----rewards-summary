import React from "react";
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
import { MoreHorizontal, Copy, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Withdrawal {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  amount: string;
  date: string;
}

interface WithdrawalTableProps {
  withdrawals: Withdrawal[];
  copyToClipboard: (text: string) => void;
  onViewDetails: (withdrawal: Withdrawal) => void;
}

const WithdrawalTable: React.FC<WithdrawalTableProps> = ({
  withdrawals,
  copyToClipboard,
  onViewDetails,
}) => (
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
                <DropdownMenuItem onClick={() => onViewDetails(withdrawal)}>
                  <Eye className="mr-2 h-4 w-4" /> View Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default WithdrawalTable;
