import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">HealthConnect</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/about">
                <Button variant="ghost">About</Button>
              </Link>
              <Link href="/services">
                <Button variant="ghost">Services</Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost">Contact</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Sign Up</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-teal-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Healthcare Access From Anywhere
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Connect with healthcare professionals instantly through secure video consultations. Get the care you
                  need, when you need it, without leaving your home.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/register">
                    <Button size="lg" className="px-8">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/how-it-works">
                    <Button size="lg" variant="outline" className="px-8">
                      How It Works
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mr-0 lg:ml-auto">
                <img
                  alt="Telehealth Consultation"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  height="550"
                  src="/placeholder.svg?height=550&width=800"
                  width="800"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our telehealth platform makes it easy to get the care you need in three simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-12">
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
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
                      className="h-10 w-10 text-teal-600"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <CardTitle className="mt-4 text-xl">Register</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Create an account and complete your health profile with basic information.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
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
                      className="h-10 w-10 text-teal-600"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                      <line x1="12" x2="12" y1="8" y2="16"></line>
                      <line x1="8" x2="16" y1="12" y2="12"></line>
                    </svg>
                  </div>
                  <CardTitle className="mt-4 text-xl">Book & Pay</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Select a specialist, choose an available time slot, and make a secure payment.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
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
                      className="h-10 w-10 text-teal-600"
                    >
                      <path d="M15 10l5 5-5 5"></path>
                      <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
                    </svg>
                  </div>
                  <CardTitle className="mt-4 text-xl">Consult</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Join your secure video consultation at the scheduled time and receive care from anywhere.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Specialties</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer consultations across a wide range of medical specialties.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-12">
              {[
                { name: "General Medicine", icon: "stethoscope" },
                { name: "Pediatrics", icon: "baby" },
                { name: "Dermatology", icon: "scan" },
                { name: "Psychiatry", icon: "brain" },
                { name: "Cardiology", icon: "heart-pulse" },
                { name: "Orthopedics", icon: "bone" },
              ].map((specialty, index) => (
                <Card key={index} className="flex flex-col items-center text-center">
                  <CardHeader>
                    <CardTitle>{specialty.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">
                      Consult with experienced specialists in {specialty.name.toLowerCase()}.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/specialties/${specialty.name.toLowerCase().replace(/\s+/g, "-")}`}>
                      <Button variant="outline">Learn More</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 HealthConnect. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-gray-500 underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
