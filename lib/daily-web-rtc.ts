// This is a simplified wrapper for Daily.co Web RTC API
// In a real implementation, you would use the actual Daily.co SDK

export interface DailyRoom {
  url: string
  token?: string
}

export interface DailyParticipant {
  id: string
  name?: string
  audioTrack?: MediaStreamTrack
  videoTrack?: MediaStreamTrack
  isMuted?: boolean
  isVideoOff?: boolean
}

export interface DailyCallOptions {
  url: string
  token?: string
  userName?: string
}

class DailyWebRTC {
  private room: DailyRoom | null = null
  private participants: Map<string, DailyParticipant> = new Map()
  private localTracks: { audio?: MediaStreamTrack; video?: MediaStreamTrack } = {}
  private onParticipantJoined: ((participant: DailyParticipant) => void) | null = null
  private onParticipantLeft: ((participantId: string) => void) | null = null
  private onError: ((error: Error) => void) | null = null

  constructor() {
    // Initialize Daily.co client
  }

  public async join(options: DailyCallOptions): Promise<void> {
    try {
      // In a real implementation, this would connect to Daily.co
      this.room = {
        url: options.url,
        token: options.token,
      }

      // Get local media tracks
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      this.localTracks = {
        audio: stream.getAudioTracks()[0],
        video: stream.getVideoTracks()[0],
      }

      // Simulate joining a room
      console.log(`Joined room: ${options.url}`)

      // Return local participant
      const localParticipant: DailyParticipant = {
        id: "local",
        name: options.userName || "You",
        audioTrack: this.localTracks.audio,
        videoTrack: this.localTracks.video,
        isMuted: false,
        isVideoOff: false,
      }

      this.participants.set("local", localParticipant)

      // Simulate other participants joining
      setTimeout(() => {
        if (this.onParticipantJoined) {
          const remoteParticipant: DailyParticipant = {
            id: "remote",
            name: "Doctor",
            isMuted: false,
            isVideoOff: false,
          }
          this.participants.set("remote", remoteParticipant)
          this.onParticipantJoined(remoteParticipant)
        }
      }, 2000)
    } catch (error) {
      if (this.onError) {
        this.onError(error as Error)
      }
    }
  }

  public leave(): void {
    // Stop all tracks
    if (this.localTracks.audio) {
      this.localTracks.audio.stop()
    }
    if (this.localTracks.video) {
      this.localTracks.video.stop()
    }

    // Clear participants
    this.participants.clear()
    this.room = null

    console.log("Left the room")
  }

  public setMuted(muted: boolean): void {
    if (this.localTracks.audio) {
      this.localTracks.audio.enabled = !muted

      const localParticipant = this.participants.get("local")
      if (localParticipant) {
        localParticipant.isMuted = muted
        this.participants.set("local", localParticipant)
      }
    }
  }

  public setVideoOff(videoOff: boolean): void {
    if (this.localTracks.video) {
      this.localTracks.video.enabled = !videoOff

      const localParticipant = this.participants.get("local")
      if (localParticipant) {
        localParticipant.isVideoOff = videoOff
        this.participants.set("local", localParticipant)
      }
    }
  }

  public getLocalStream(): MediaStream | null {
    if (!this.localTracks.audio && !this.localTracks.video) {
      return null
    }

    const stream = new MediaStream()
    if (this.localTracks.audio) {
      stream.addTrack(this.localTracks.audio)
    }
    if (this.localTracks.video) {
      stream.addTrack(this.localTracks.video)
    }

    return stream
  }

  public setOnParticipantJoined(callback: (participant: DailyParticipant) => void): void {
    this.onParticipantJoined = callback
  }

  public setOnParticipantLeft(callback: (participantId: string) => void): void {
    this.onParticipantLeft = callback
  }

  public setOnError(callback: (error: Error) => void): void {
    this.onError = callback
  }
}

export default DailyWebRTC
