import {
  videoCodecs
} from './param'

/*
  Create a new stream in answer that forwards a given track with
  specific Simulcast rid.

  forwardStream ::
    Transport
    -> SDPInfo
    -> String
    -> IncomingStreamTrack
    -> ()
 */
export const forwardStream = async (transport, offer, answer, incomingStream) => {
  // videoOffer :: MediaInfo
  const videoOffer = offer.getMedia('video')
  if (!videoOffer) {
    throw new Error('offer must contain video stream')
  }

  // video :: MediaInfo
  const video = videoOffer.answer({
    codecs: videoCodecs
  })

  answer.addMedia(video)

  // outgoingStream :: OutgoingStream
  const outgoingStream = transport.createOutgoingStream({
    video: true
  })

  outgoingStream.attachTo(incomingStream)

  // streamInfo :: StreamInfo
  const streamInfo = outgoingStream.getStreamInfo()

  answer.addStream(streamInfo)
}
