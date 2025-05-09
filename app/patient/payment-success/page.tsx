"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function PaymentSuccess() {
  // Mock appointment data
  const appointment = {
    id: "APT12345",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    date: "May 15, 2025",
    time: "10:00 AM",
    fee: 75,
  }

  return (
    <div className="container max-w-md py-10">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful</CardTitle>
          <CardDescription>Your appointment has been booked</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Appointment ID</span>
                <span className="font-medium">{appointment.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Doctor</span>
                <span className="font-medium">{appointment.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Specialty</span>
                <span className="font-medium">{appointment.specialty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="font-medium">{appointment.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Time</span>
                <span className="font-medium">{appointment.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount Paid</span>
                <span className="font-medium">${appointment.fee}.00</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            A confirmation email has been sent to your registered email address with all the details.
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link href="/patient/dashboard" className="w-full">
            <Button className="w-full">Go to Dashboard</Button>
          </Link>
          <Link href="/consultation/prepare" className="w-full">
            <Button variant="outline" className="w-full">
              Prepare for Consultation
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
