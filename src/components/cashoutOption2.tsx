'use client'

import { useState } from 'react'
import { Wallet, Tag, ArrowLeft, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

export function CashoutOptions2() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [cashoutMethod, setCashoutMethod] = useState<string>('bank')
  const [promoCode, setPromoCode] = useState<string>('')
  const [showAlert, setShowAlert] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const generatePromoCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    setPromoCode(code)
  }

  const handleBankTransferSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowAlert(true)
    }, 5000)
  }

  const renderBankTransfer = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="account">Account Number</Label>
        <Input id="account" placeholder="Enter your account number" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Cashout Amount</Label>
        <Input id="amount" placeholder="Enter amount to cashout" type="number" />
      </div>
      <Button className="w-full" onClick={handleBankTransferSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Process Cashout'}
      </Button>
    </div>
  )

  const renderFutureBookingDiscount = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="booking-id">Booking ID</Label>
        <Input id="booking-id" placeholder="Enter your future booking ID" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="discount-amount">Discount Amount</Label>
        <Input id="discount-amount" placeholder="Enter discount amount" type="number" />
      </div>
      <Button className="w-full">Apply Discount</Button>
    </div>
  )

  const renderDirectCashout = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Direct Cashout</CardTitle>
        <CardDescription>Choose your cashout method</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup defaultValue="bank" onValueChange={(value) => setCashoutMethod(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bank" id="bank" />
            <Label htmlFor="bank">Bank Transfer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="future_booking" id="future_booking" />
            <Label htmlFor="future_booking">Discount on Future Booking</Label>
          </div>
        </RadioGroup>
        {cashoutMethod === 'bank' ? renderBankTransfer() : renderFutureBookingDiscount()}
      </CardContent>
    </Card>
  )

  const renderPromoCode = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Promo Code</CardTitle>
        <CardDescription>Generate a promo code for future bookings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input value={promoCode} readOnly placeholder="Your promo code will appear here" />
          <Button size="icon" variant="outline" onClick={() => navigator.clipboard.writeText(promoCode)}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={generatePromoCode} className="w-full">
          Generate Promo Code
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Valid for 30 days</p>
        <p className="text-sm font-medium">Value: $50.00</p>
      </CardFooter>
    </Card>
  )

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Choose Your Cash-Out Method</CardTitle>
        <CardDescription className="text-center">Select how you'd like to receive your cashback</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!selectedOption ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="relative overflow-hidden cursor-pointer" onClick={() => setSelectedOption('direct')}>
              <CardHeader className="pb-2">
                <Wallet className="w-8 h-8 mb-2 text-primary" />
                <CardTitle>Direct Cashout</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Withdraw your cashback directly to your bank account or use it as a discount on future bookings.
                </p>
              </CardContent>
              <div className="absolute top-0 right-0 p-2 bg-primary text-primary-foreground text-xs font-bold rounded-bl-lg">
                Fast
              </div>
            </Card>
            <Card className="relative overflow-hidden cursor-pointer" onClick={() => setSelectedOption('promo')}>
              <CardHeader className="pb-2">
                <Tag className="w-8 h-8 mb-2 text-primary" />
                <CardTitle>Promo Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Convert your cashback into promo codes which you can apply to future bookings for extra savings.
                </p>
              </CardContent>
              <div className="absolute top-0 right-0 p-2 bg-secondary text-secondary-foreground text-xs font-bold rounded-bl-lg">
                More Value
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => setSelectedOption(null)} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Options
            </Button>
            {selectedOption === 'direct' ? renderDirectCashout() : renderPromoCode()}
          </div>
        )}
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">Available Cashback: $50.00</p>
        <Button variant="ghost">View Cashback History</Button>
      </CardFooter>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bank Transfer Successful</AlertDialogTitle>
            <AlertDialogDescription>
              Your cashout request has been processed successfully. The funds should appear in your account within 3-5 business days.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlert(false)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}