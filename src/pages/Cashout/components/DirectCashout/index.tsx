import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import BankTransferForm from "../BankTransferForm.tsx/index.tsx";
import FutureBookingForm from "../FutureBookingForm.tsx/index.tsx";

const DirectCashout = () => {
  const [cashoutMethod, setCashoutMethod] = useState<string>("bank");

  return (
    <div className="space-y-4">
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
      {cashoutMethod === "bank" ? <BankTransferForm /> : <FutureBookingForm />}
    </div>
  );
};

export default DirectCashout;
