import {
  randomId,
  wrapHandler
} from '../util'

import { initOffer } from '../streaming/init'
import { acceptSimulcastStream } from '../streaming/accept'

export const createSimulcastSourceHandler = config => {
  const { endpoint, sessionTable } = config

  return wrapHandler(async (request, response) => {
    const { offer: rawOffer } = request.body

    if (typeof rawOffer !== 'string') {
      throw new Error('offer must be provided as JSON string')
    }

    const { transport, offer, answer } = initOffer(endpoint, rawOffer)
    const streamTable = acceptSimulcastStream(transport, offer, answer)

    const sessionId = await randomId()

    sessionTable.set(sessionId, streamTable)

    transport.on('stopped', ev => {
      console.log(`source for session ${sessionId} has stopped`)
      sessionTable.delete(sessionId)
    })

    response.json({
      session_id: sessionId,
      answer: answer.toString()
    })
  })
}
