"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, FileText, MessageSquare, Video } from "lucide-react"

export default function PatientDashboard() {
  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "May 15, 2025",
      time: "10:00 AM",
      status: "confirmed",
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "May 22, 2025",
      time: "2:30 PM",
      status: "confirmed",
    },
  ]

  // Mock data for past appointments
  const pastAppointments = [
    {
      id: 3,
      doctorName: "Dr. Emily Wilson",
      specialty: "General Medicine",
      date: "April 30, 2025",
      time: "11:15 AM",
      status: "completed",
    },
    {
      id: 4,
      doctorName: "Dr. Robert Garcia",
      specialty: "Orthopedics",
      date: "April 15, 2025",
      time: "9:00 AM",
      status: "completed",
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <p className="text-gray-500">Welcome back, John Doe</p>
        </div>
        <Link href="/patient/find-doctor">
          <Button>Book New Appointment</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            <p className="text-xs text-gray-500">Next: May 15, 2025</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Medical Records</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500">Last updated: May 1, 2025</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500">Unread messages</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="past">Past Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold">{appointment.doctorName}</h3>
                      <p className="text-sm text-gray-500">{appointment.specialty}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 self-end">
                      <Link href={`/patient/appointment/${appointment.id}`}>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          View Details
                        </Button>
                      </Link>
                      <Link href={`/consultation/${appointment.id}`}>
                        <Button size="sm" className="w-full sm:w-auto">
                          <Video className="h-4 w-4 mr-2" />
                          Join Consultation
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No upcoming appointments</p>
              <Link href="/patient/find-doctor" className="mt-4 inline-block">
                <Button>Book an Appointment</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastAppointments.length > 0 ? (
            pastAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold">{appointment.doctorName}</h3>
                      <p className="text-sm text-gray-500">{appointment.specialty}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 self-end">
                      <Link href={`/patient/medical-records/${appointment.id}`}>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          View Records
                        </Button>
                      </Link>
                      <Link href={`/patient/book-followup/${appointment.id}`}>
                        <Button size="sm" className="w-full sm:w-auto">
                          Book Follow-up
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No past appointments</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
