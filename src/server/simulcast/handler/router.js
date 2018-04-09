import { Router } from 'express'
import { wrapHandler } from '../../util'
import { createSimulcastSinkHandler } from './sink'
import { createSimulcastSourceHandler } from './source'

export const createSimulcastApiRouter = config => {
  const router = Router()

  const createSimulcastSource = createSimulcastSourceHandler(config)
  const createSimulcastSink = createSimulcastSinkHandler(config)

  router.post('/source', wrapHandler((request, response) => {
    const { offer: rawOffer } = request.body

    return createSimulcastSource({ rawOffer })
  }))

  router.post('/sessions/:sessionId/sink', wrapHandler((request, response) => {
    const { trackId, rid } = request.query
    const { offer: rawOffer } = request.body
    const sessionId = request.params.sessionId

    return createSimulcastSink({
      rid,
      trackId,
      rawOffer,
      sessionId
    })
  }))

  router.use((err, request, response, next) => {
    console.error(err)
    response.status(500).json({
      message: err.message,
      stack: err.stack
    })
  })

  return router
}