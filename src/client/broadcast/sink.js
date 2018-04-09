import { handleTrackEvent } from './track'

export const createEchoStream = async (container, sessionId) => {
  console.log(`creating echo stream for session ${sessionId}`)
  const pc = new RTCPeerConnection()

  handleTrackEvent(pc, container, 'Broadcasted Stream')

  pc.addTransceiver('video', {
    direction: 'sendrecv'
  })

  const offer = await pc.createOffer()
  console.log('offer SDP:', offer.sdp)

  await pc.setLocalDescription(offer)

  const response = await fetch(`/api/broadcast/sessions/${sessionId}/sink`, {
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
