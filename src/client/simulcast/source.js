import { mungeSdp } from './sdp'
import { handleTrackEvent } from '../common/track'

const createOfferChrome = async videoTrack => {
  const pc = new RTCPeerConnection()
  pc.addTrack(videoTrack)

  const offer = await pc.createOffer()

  console.log('original offer:', offer.sdp)

  const offerSdp = mungeSdp(offer.sdp)
  console.log('munged sdp:', offerSdp)

  return {
    pc,
    offerSdp
  }
}

const createOfferFirefox = async videoTrack => {
  const pc = new RTCPeerConnection()

  const transceiver = pc.addTransceiver(videoTrack, {
    direction: 'sendrecv',
    sendEncodings: [
      { rid: 'original', active: true },
      { rid: 'half', active: true, scaleDownResolutionBy: 2.0 },
      { rid: 'quarter', active: true, scaleDownResolutionBy: 4.0 }
    ]
  })

  const { sender } = transceiver
  const param = sender.getParameters()

  console.log('sender params:', param)

  const offer = await pc.createOffer()

  const offerSdp = offer.sdp
  console.log('offer:', offer.sdp)

  return {
    pc,
    offerSdp
  }
}

const createOffer = async videoTrack => {
  if (navigator.userAgent.includes('Chrome')) {
    return createOfferChrome(videoTrack)
  } else {
    return createOfferFirefox(videoTrack)
  }
}

export const streamSimulcast = async (sinkVideoContainer, videoElement) => {
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true
  })
  console.log('mediaStream:', mediaStream)

  videoElement.srcObject = mediaStream
  videoElement.autoplay = true

  const videoTrack = mediaStream.getVideoTracks()[0]
  console.log('video track:', videoTrack)
  if (!videoTrack) {
    throw new Error('expect at least video track to be present')
  }

  const { pc, offerSdp } = await createOffer(videoTrack)

  handleTrackEvent(pc, sinkVideoContainer, 'Echo Stream from same PC')

  await pc.setLocalDescription({
    type: 'offer',
    sdp: offerSdp
  })

  const response = await fetch('/api/simulcast/source', {
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

  const answerSdp = result.answer

  console.log('answer SDP:', answerSdp)

  await pc.setRemoteDescription({
    type: 'answer',
    sdp: answerSdp
  })

  return {
    tracks,
    sessionId,
    pc
  }
}
