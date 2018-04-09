import {
  videoCodecs,
  headerExtensions
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
export const forwardStream = async (transport, offer, answer, trackId, rid, incomingStream) => {
  // videoOffer :: MediaInfo
  const videoOffer = offer.getMedia('video')
  if (!videoOffer) {
    throw new Error('offer must contain video stream')
  }

  // video :: MediaInfo
  const video = videoOffer.answer({
    codecs: videoCodecs,
    extensions: headerExtensions,
    simulcast: true
  })

  answer.addMedia(video)

  // outgoingStream :: OutgoingStream
  const outgoingStream = transport.createOutgoingStream({
    video: true
  })

  outgoingStream.attachTo(incomingStream)

  // outgoingTrack :: OutgoingStreamTrack
  // const outgoingTrack = outgoingStream.getVideoTracks()[0]
  // if (!outgoingTrack) {
  //   throw new Error('Expected outgoing stream to have at least one video track')
  // }

  // transponder :: Transponder
  // const transponder = outgoingTrack.attachTo(incomingTrack)
  // transponder.selectEncoding(rid)

  // streamInfo :: StreamInfo
  const streamInfo = outgoingStream.getStreamInfo()

  answer.addStream(streamInfo)

  // console.log('added outgoing track', outgoingTrack)
}