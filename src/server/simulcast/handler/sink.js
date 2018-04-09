import { initOffer } from '../streaming/init'
import { forwardStream } from '../streaming/forward'

export const createSimulcastSinkHandler = config => {
  const { endpoint, sessionTable } = config

  return async args => {
    const {
      rid,
      trackId,
      rawOffer,
      sessionId
    } = args

    if (typeof rawOffer !== 'string') {
      throw new Error('offer must be provided as JSON string')
    }

    const streamTable = sessionTable.get(sessionId)
    if (!streamTable) {
      throw new Error(`invalid session ID ${sessionId}`)
    }

    const trackTable = streamTable.get(trackId)
    if (!trackTable) {
      throw new Error(`invalid track ID ${trackId}`)
    }

    const incomingStream = trackTable.get(rid)
    if (!incomingStream) {
      throw new Error(`invalid rid ${rid}`)
    }

    const { transport, offer, answer } = initOffer(endpoint, rawOffer)
    forwardStream(transport, offer, answer, trackId, rid, incomingStream)

    return {
      answer: answer.toString()
    }
  }
}
