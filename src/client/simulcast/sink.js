import { handleTrackEvent } from './track'

export const createEchoStreams = async (container, sessionId, tracks) => {
  for (const [trackId, rids] of Object.entries(tracks)) {
    for (const rid of rids) {
      console.log(`creating echo stream for track ${trackId} and rid ${rid}`)
      const pc = new RTCPeerConnection()

      handleTrackEvent(pc, container, `Simulcast RID ${rid}`)

      pc.addTransceiver('video', {
        direction: 'sendrecv'
      })

      const offer = await pc.createOffer()
      console.log('offer SDP:', offer.sdp)

      await pc.setLocalDescription(offer)

      const response = await fetch(`/api/simulcast/sessions/${sessionId}/sink?trackId=${trackId}&rid=${rid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          offer: offer.sdp
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
