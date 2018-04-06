import { createRecorder } from 'medooze-media-server'
import {
  videoCodecs,
  headerExtensions
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
export const acceptSimulcastStream = (transport, offer, answer) => {
  // videoOffer :: MediaInfo
  const videoOffer = offer.getMedia('video')
  if (!videoOffer) {
    throw new Error('offer must contain simulcast video stream')
  }

  // simulcastInfo :: Optional SimulcastInfo
  const simulcastInfo = videoOffer.getSimulcast()
  if (!simulcastInfo) {
    throw new Error('offer video must have simulcast enabled')
  }

  // video :: MediaInfo
  const video = videoOffer.answer({
    codecs: videoCodecs,
    extensions: headerExtensions,
    simulcast: true
  })

  answer.addMedia(video)

  transport.setLocalProperties({
    video: answer.getMedia('video')
  })

  // streamTable :: Map String (Map String IncomingStreamTrack)
  const streamTable = new Map()

  // offerStreams :: Map String StreamInfo
  const offerStreams = offer.getStreams()

  // streamInfo :: StreamInfo
  for (const streamInfo of offerStreams.values()) {
    // incomingStream :: IncomingStream
    console.log('create IncomingStream', streamInfo)
    const incomingStream = transport.createIncomingStream(streamInfo)
    console.log('created IncomingStream', incomingStream)

    const recorder = createRecorder(`tmp/${new Date()}.mp4`)
    recorder.record(incomingStream)

    // trackInfos :: Map String TrackInfo
    const trackInfos = streamInfo.getTracks()

    for (const trackInfo of trackInfos.values()) {
      const trackId = trackInfo.getId()

      // trackTable :: Map String IncomingStreamTrack
      const trackTable = new Map()
      streamTable.set(trackId, trackTable)

      // incomingTrack :: IncomingStreamTrack
      const incomingTrack = incomingStream.getTrack(trackId)

      // encodings :: Array (Array TrackEncodingInfo)
      const encodings = trackInfo.getEncodings()

      for (const alternatives of encodings) {
        for (const encodingInfo of alternatives) {
          const rid = encodingInfo.getId()
          trackTable.set(rid, incomingTrack)
        }
      }
    }
  }

  const outgoingStream  = transport.createOutgoingStream({
    video: true
  })
  answer.addStream(outgoingStream.getStreamInfo())

  return streamTable
}
