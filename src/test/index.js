import {
  offerSdp,
  receiveSdp
} from './sdp'

import { loadConfig } from '../lib/config/load'
import { initOffer } from '../lib/streaming/init'
import { forwardStream } from '../lib/streaming/forward'
import { acceptSimulcastStream } from '../lib/streaming/accept'

(async () => {
  const config = await loadConfig()

  const { endpoint } = config

  const {
    offer,
    answer,
    transport
  } = initOffer(endpoint, offerSdp)

  const streamTable = acceptSimulcastStream(transport, offer, answer)

  console.log('simulcast answer:\n' + answer.toString())

  for (const [trackId, trackTable] of streamTable.entries()) {
    for (const [rid, incomingStream] of trackTable.entries()) {
      const {
        offer,
        answer,
        transport
      } = initOffer(endpoint, receiveSdp)

      forwardStream(transport, offer, answer, rid, incomingStream)

      console.log(`created forward stream with track ${trackId}, and rid ${rid}`)
      console.log(answer.toString())
    }
  }
})()
