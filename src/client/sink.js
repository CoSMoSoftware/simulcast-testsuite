export const createEchoStreams = async (container, sessionId, tracks) => {
  for (const [trackId, rids] of Object.entries(tracks)) {
    for (const rid of rids) {
      console.log(`creating echo stream for track ${trackId} and rid ${rid}`)
      const pc = new RTCPeerConnection()

      const transceiver = pc.addTransceiver('video', {
        direction: 'recvonly'
      })

      const offer = await pc.createOffer()
      console.log('offer SDP:', offer.sdp)

      await pc.setLocalDescription(offer)

      const response = await fetch(`/api/sessions/${sessionId}/sink?trackId=${trackId}&rid=${rid}`, {
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

      const videoTrack = transceiver.receiver.track

      const video = document.createElement('video')
      video.srcObject = new MediaStream([videoTrack])

      const desc = document.createElement('p')
      desc.innerText = `trackId: ${trackId}, rid: ${rid}`

      const div = document.createElement('div')
      div.classList.add('sink-video-container')
      div.appendChild(video)
      div.appendChild(desc)

      container.appendChild(div)
    }
  }
}