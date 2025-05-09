"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Calendar, Clock, CreditCard } from "lucide-react"

export default function BookAppointment({ params }: { params: { doctorId: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const date = searchParams.get("date") || "May 15, 2025"
  const time = searchParams.get("time") || "10:00 AM"

  const [loading, setLoading] = useState(false)
  const [reason, setReason] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("credit_card")

  // Mock doctor data
  const doctor = {
    id: params.doctorId,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    image: "/placeholder.svg?height=100&width=100",
    fee: 75,
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real app, you would make an API call to process the payment and book the appointment
      // For demo purposes, we'll simulate a successful payment and booking
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Payment successful",
        description: "Your appointment has been booked successfully.",
      })

      router.push("/patient/payment-success")
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Book Appointment</h1>
        <p className="text-gray-500">Complete your booking with {doctor.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>Please provide the reason for your visit</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Visit</Label>
                  <Textarea
                    id="reason"
                    placeholder="Please describe your symptoms or reason for consultation"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 gap-2">
                    <div className="flex items-center space-x-2 rounded-md border p-4">
                      <RadioGroupItem value="credit_card" id="credit_card" />
                      <Label htmlFor="credit_card" className="flex flex-1 items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Credit/Debit Card</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-4">
                      <RadioGroupItem value="insurance" id="insurance" />
                      <Label htmlFor="insurance" className="flex flex-1">
                        <div className="flex items-center space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                            <path d="M13 5v2"></path>
                            <path d="M13 17v2"></path>
                            <path d="M13 11v2"></path>
                          </svg>
                          <span>Insurance</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Processing Payment..." : `Pay $${doctor.fee}.00`}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{doctor.name}</h3>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{time}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Consultation Fee</span>
                  <span>${doctor.fee}.00</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Platform Fee</span>
                  <span>$0.00</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${doctor.fee}.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
