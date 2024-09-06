import { useState } from "react";
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

const PromoCode = () => {
  const [promoCode, setPromoCode] = useState<string>("");

  const generatePromoCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setPromoCode(code);
  };

  const handlePromoCode = () => {
    navigator.clipboard.writeText(promoCode);
    toast.success("Copied!");
    setPromoCode("");
  };

  const max = 21200;

  return (
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
        <p className="text-sm font-medium">
          Value: ₦{max.toLocaleString("en-US")}
        </p>
      </CardFooter>
    </Card>
  );
};

export default PromoCode;
