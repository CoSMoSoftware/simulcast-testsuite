export const streamSimulcast = async videoElement => {
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true
  })
  console.log('mediaStream:', mediaStream)

  videoElement.srcObject = mediaStream
  videoElement.autoplay = true

  const pc = new RTCPeerConnection({
    bundlePolicy: 'max-bundle',
    rtcpMuxPolicy: 'require'
  })

  const videoTrack = mediaStream.getVideoTracks()[0]
  console.log('video track:', videoTrack)
  if (!videoTrack) {
    throw new Error('expect at least video track to be present')
  }

  const transceiver = pc.addTransceiver(videoTrack, {
    direction: 'sendrecv',
    sendEncodings: [
      { rid: 'a' },
      { rid: 'b', scaleDownResolutionBy: 2.0 },
      { rid: 'c', scaleDownResolutionBy: 4.0 }
    ]
  })

  // TODO: Remove setParameters call when releasing.
  // rid is a read only parameter and should not
  // be modified by setParameters. The correct way
  // to enable simulcast should be by setting the
  // same parameters in addTransceiver, but that
  // is currently not working in Firefox.
  await transceiver.sender.setParameters({
    encodings: [
      { rid: 'a' },
      { rid: 'b', scaleDownResolutionBy: 2.0 },
      { rid: 'c', scaleDownResolutionBy: 4.0 }
    ]
  })

  console.log('transceiver after set param:', transceiver)

  const offer = await pc.createOffer()
  await pc.setLocalDescription(offer)

  console.log('offer SDP:', offer.sdp)

  // TODO: Remove the format conversion when releasing.
  // Firefox is using an older format of the simulcast line.
  // We convert it to the new format temporarily to test the test.
  const offerSdp = offer.sdp.replace(': send rid=', ':send ')

  const response = await fetch('/api/source', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      offer: offerSdp
    })
  })

  if (!response.ok) {
    throw new Error(`API return unexpected status ${response.status}: ${await response.text()}`)
  }

  const result = await response.json()
  console.log('API result:', result)

  const sessionId = result.session_id
  const { tracks } = result

  // TODO: Remove the format conversion when releasing.
  const answerSdp = result.answer.replace(':recv ', ': recv rid=')

  console.log('answer SDP:', answerSdp)

  await pc.setRemoteDescription({
    type: 'answer',
    sdp: answerSdp
  })

  return {
    tracks,
    sessionId
  }
}
