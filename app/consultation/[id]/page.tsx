"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Mic, MicOff, Phone, Send, Video, VideoOff } from "lucide-react"

export default function Consultation({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ sender: string; text: string; time: string }[]>([])
  const [transcription, setTranscription] = useState<string[]>([])

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  // Mock appointment data
  const appointment = {
    id: params.id,
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    patientName: "John Doe",
  }

  useEffect(() => {
    // Simulate loading and connecting to video call
    const timer = setTimeout(() => {
      setIsLoading(false)
      setIsConnected(true)

      // Add initial system message
      setMessages([
        {
          sender: "System",
          text: "Consultation started. All communications are private and secure.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])

      // Simulate getting local video stream
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream
            }
          })
          .catch((err) => {
            console.error("Error accessing media devices:", err)
            toast({
              title: "Camera access error",
              description: "Could not access your camera or microphone. Please check permissions.",
              variant: "destructive",
            })
          })
      }

      // Simulate transcription updates
      const transcriptionInterval = setInterval(() => {
        const transcripts = [
          "Doctor: Hello, how are you feeling today?",
          "Patient: I've been having some chest pain for the past few days.",
          "Doctor: I see. Can you describe the pain? Is it sharp or dull?",
          "Patient: It's more of a pressure, especially when I exert myself.",
          "Doctor: How long does the pain typically last?",
          "Patient: Usually a few minutes, then it subsides.",
          "Doctor: Have you noticed any other symptoms like shortness of breath?",
          "Patient: Yes, sometimes I feel a bit short of breath along with the pain.",
        ]

        setTranscription((prev) => {
          if (prev.length < transcripts.length) {
            return [...prev, transcripts[prev.length]]
          }
          return prev
        })
      }, 5000)

      return () => {
        clearInterval(transcriptionInterval)
        // Clean up video streams
        if (localVideoRef.current && localVideoRef.current.srcObject) {
          const stream = localVideoRef.current.srcObject as MediaStream
          stream.getTracks().forEach((track) => track.stop())
        }
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      sender: "You",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage("")

    // Simulate doctor response after a short delay
    setTimeout(() => {
      const doctorResponse = {
        sender: appointment.doctorName,
        text: "Thank you for sharing that information. Based on your symptoms, I recommend we run some additional tests.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, doctorResponse])
    }, 3000)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // In a real app, you would mute the actual audio track here
  }

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff)
    // In a real app, you would disable the actual video track here
  }

  const endCall = () => {
    // In a real app, you would disconnect from the call here
    toast({
      title: "Call ended",
      description: "Your consultation has ended. A summary will be sent to your email.",
    })
    window.location.href = "/patient/dashboard"
  }

  if (isLoading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connecting to your consultation...</h2>
          <div className="animate-pulse text-gray-500">Please wait while we establish a secure connection</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-4 h-screen flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Consultation with {appointment.doctorName}</h1>
          <p className="text-gray-500">{appointment.specialty}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={toggleMute}>
            {isMuted ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
            {isMuted ? "Unmute" : "Mute"}
          </Button>
          <Button variant="outline" size="sm" onClick={toggleVideo}>
            {isVideoOff ? <VideoOff className="h-4 w-4 mr-2" /> : <Video className="h-4 w-4 mr-2" />}
            {isVideoOff ? "Start Video" : "Stop Video"}
          </Button>
          <Button variant="destructive" size="sm" onClick={endCall}>
            <Phone className="h-4 w-4 mr-2" />
            End Call
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow overflow-hidden">
        <div className="md:col-span-2 flex flex-col">
          <div className="relative bg-black rounded-lg flex-grow overflow-hidden">
            {/* Main video (doctor) */}
            <video
              ref={remoteVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              poster="/placeholder.svg?height=600&width=800"
            />

            {/* Small video (patient) */}
            <div className="absolute bottom-4 right-4 w-1/4 h-1/4 rounded-lg overflow-hidden border-2 border-background">
              <video
                ref={localVideoRef}
                className={`w-full h-full object-cover ${isVideoOff ? "hidden" : ""}`}
                autoPlay
                playsInline
                muted
              />
              {isVideoOff && (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <span className="text-white text-xs">Video Off</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full">
          <Tabs defaultValue="chat" className="flex flex-col h-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="transcription">Transcription</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-grow flex flex-col mt-0">
              <Card className="flex-grow flex flex-col">
                <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.sender === "You"
                            ? "bg-primary text-primary-foreground"
                            : msg.sender === "System"
                              ? "bg-gray-100 text-gray-500 text-sm italic"
                              : "bg-gray-100"
                        }`}
                      >
                        {msg.sender !== "You" && msg.sender !== "System" && (
                          <div className="font-semibold text-sm">{msg.sender}</div>
                        )}
                        <div>{msg.text}</div>
                        <div className="text-xs mt-1 opacity-70">{msg.time}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="transcription" className="flex-grow flex flex-col mt-0">
              <Card className="flex-grow">
                <CardContent className="p-4 h-full overflow-y-auto">
                  <div className="space-y-2">
                    {transcription.length > 0 ? (
                      transcription.map((line, index) => (
                        <p key={index} className="text-sm">
                          {line}
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        Transcription will appear here during the consultation
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
