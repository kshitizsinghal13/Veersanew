"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star } from "lucide-react"

export default function FindDoctor() {
  const [specialty, setSpecialty] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for doctors
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.9,
      reviews: 124,
      location: "New York, NY",
      distance: "2.5 miles",
      availableDates: ["May 15, 2025", "May 16, 2025", "May 18, 2025"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      rating: 4.8,
      reviews: 98,
      location: "New York, NY",
      distance: "3.2 miles",
      availableDates: ["May 14, 2025", "May 17, 2025", "May 19, 2025"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Dr. Emily Wilson",
      specialty: "General Medicine",
      rating: 4.7,
      reviews: 156,
      location: "New York, NY",
      distance: "1.8 miles",
      availableDates: ["May 13, 2025", "May 14, 2025", "May 15, 2025"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Dr. Robert Garcia",
      specialty: "Orthopedics",
      rating: 4.9,
      reviews: 112,
      location: "New York, NY",
      distance: "4.1 miles",
      availableDates: ["May 16, 2025", "May 17, 2025", "May 20, 2025"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      name: "Dr. Lisa Thompson",
      specialty: "Psychiatry",
      rating: 4.8,
      reviews: 87,
      location: "New York, NY",
      distance: "2.9 miles",
      availableDates: ["May 14, 2025", "May 15, 2025", "May 18, 2025"],
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 6,
      name: "Dr. David Kim",
      specialty: "Pediatrics",
      rating: 4.9,
      reviews: 143,
      location: "New York, NY",
      distance: "3.5 miles",
      availableDates: ["May 13, 2025", "May 16, 2025", "May 19, 2025"],
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  // Filter doctors based on search term and specialty
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = specialty === "" || doctor.specialty === specialty
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find a Doctor</h1>
        <p className="text-gray-500">Search for specialists and book your telehealth appointment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-1">
          <div className="space-y-6 sticky top-20">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search by name or specialty"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Select value={specialty} onValueChange={setSpecialty}>
                <SelectTrigger id="specialty">
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Dermatology">Dermatology</SelectItem>
                  <SelectItem value="General Medicine">General Medicine</SelectItem>
                  <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="Psychiatry">Psychiatry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchTerm("")
                  setSpecialty("")
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          {filteredDoctors.length > 0 ? (
            <div className="space-y-6">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-grow space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold">{doctor.name}</h3>
                          <p className="text-gray-500">{doctor.specialty}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1 text-sm">{doctor.rating}</span>
                            <span className="ml-1 text-sm text-gray-500">({doctor.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="ml-1 text-sm text-gray-500">
                              {doctor.location} • {doctor.distance}
                            </span>
                          </div>
                        </div>

                        <Tabs defaultValue={doctor.availableDates[0]} className="w-full">
                          <TabsList className="grid grid-cols-3 mb-2">
                            {doctor.availableDates.map((date) => (
                              <TabsTrigger key={date} value={date} className="text-xs">
                                {date}
                              </TabsTrigger>
                            ))}
                          </TabsList>

                          {doctor.availableDates.map((date) => (
                            <TabsContent key={date} value={date} className="mt-0">
                              <div className="grid grid-cols-3 gap-2 mt-2">
                                {["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"].map(
                                  (time, index) => (
                                    <Link
                                      key={index}
                                      href={`/patient/book-appointment/${doctor.id}?date=${date}&time=${time}`}
                                    >
                                      <Button variant="outline" size="sm" className="w-full text-xs">
                                        {time}
                                      </Button>
                                    </Link>
                                  ),
                                )}
                              </div>
                            </TabsContent>
                          ))}
                        </Tabs>
                      </div>
                      <div className="flex flex-col justify-between">
                        <Link href={`/doctor/${doctor.id}`}>
                          <Button variant="outline" className="w-full">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No doctors found matching your criteria</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("")
                  setSpecialty("")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
