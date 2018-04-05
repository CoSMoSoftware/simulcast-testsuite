import {
  wrapHandler
} from '../util'

import { initOffer } from '../streaming/init'
import { forwardStream } from '../streaming/forward'

export const createSimulcastSinkHandler = config => {
  const { endpoint, sessionTable } = config

  return wrapHandler(async (request, response) => {
    const { trackId, rid } = request.query
    const { offer: rawOffer } = request.body
    const sessionId = request.params.sessionId

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

    const incomingTrack = trackTable.get(rid)
    if (!incomingTrack) {
      throw new Error(`invalid rid ${rid}`)
    }

    const { transport, offer, answer } = initOffer(endpoint, rawOffer)
    forwardStream(transport, offer, answer, rid, incomingTrack)

    response.json({
      answer: answer.toString()
    })
  })
}
