import { Peer } from 'peerjs'

let peer: Peer | null = null

export function initializePeer(userId: string) {
  if (!peer) {
    peer = new Peer(userId, {
      host: '/',
      port: 443,
      path: '/peerjs',
      secure: true
    })
  }
  return peer
}

export function getPeer() {
  return peer
}

export function destroyPeer() {
  if (peer) {
    peer.destroy()
    peer = null
  }
}