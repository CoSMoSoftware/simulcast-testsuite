// import { createRecorder } from 'medooze-media-server'
import {
  videoCodecs
} from './param'

/*
  Accept a simulcast stream by:
    1. Take a transport and its associated offer / answer
    2. Create IncomingStream object for each rid stream and
       store them in a stream table
    3. Add the accepted video offer to answer
    4. Return the stream table

  acceptSimulcastStream ::
    Transport
    -> SDPInfo
    -> SDPInfo
    -> Map String (Map String (Map String IncomingStreamTrack))
 */
export const acceptBroadcastStream = (transport, offer, answer) => {
  // videoOffer :: MediaInfo
  const videoOffer = offer.getMedia('video')
  if (!videoOffer) {
    throw new Error('offer must contain simulcast video stream')
  }

  // videoAnswer :: MediaInfo
  const videoAnswer = videoOffer.answer({
    codecs: videoCodecs
  })

  answer.addMedia(videoAnswer)

  transport.setLocalProperties({
    video: answer.getMedia('video')
  })

  const [streamInfo] = offer.getStreams().values()
  if (!streamInfo) {
    throw new Error('expect at least one stream available in offer')
  }

  console.log('streamInfo:', streamInfo)

  // incomingStream :: IncomingStream
  const incomingStream = transport.createIncomingStream(streamInfo)

  const outgoingStream = transport.createOutgoingStream({
    video: true
  })

  outgoingStream.attachTo(incomingStream)
  answer.addStream(outgoingStream.getStreamInfo())

  return incomingStream
}
