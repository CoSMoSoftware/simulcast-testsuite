import { handleTrackEvent } from '../common/track'

export const createEchoStreams = async (container, sessionId, tracks) => {
  for (const [trackId, rids] of Object.entries(tracks)) {
    for (const rid of rids) {
      console.log(`creating echo stream for track ${trackId} and rid ${rid}`)
      const pc = new RTCPeerConnection({
        sdpSemantics: 'unified-plan'
      })

      handleTrackEvent(pc, container, `Simulcast RID ${rid}`)

      pc.addTransceiver('video', {
        direction: 'recvonly'
      })

      const offer = await pc.createOffer()
      console.log('offer SDP:', offer.sdp)

      await pc.setLocalDescription(offer)

      const response = await fetch(`/api/simulcast/sessions/${sessionId}/sink`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rid,
          offer: offer.sdp,
          track_id: trackId
        })
      })

      if (!response.ok) {
        throw new Error(`API return unexpected status ${response.status}: ${await response.text()}`)
      }

      const result = await response.json()
      console.log('Sink API result:', result)

      console.log('answer SDP:', result.answer)

      await pc.setRemoteDescription({
        type: 'answer',
        sdp: result.answer
      })
    }
  }
}
