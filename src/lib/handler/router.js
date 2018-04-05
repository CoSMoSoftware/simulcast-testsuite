import { Router } from 'express'
import { createSimulcastSinkHandler } from './sink'
import { createSimulcastSourceHandler } from './source'

export const createApiRouter = config => {
  const router = Router()

  router.post('/source',
    createSimulcastSourceHandler(config))

  router.post('/sessions/:sessionId/sink',
    createSimulcastSinkHandler(config))

  router.use((err, request, response, next) => {
    console.error(err)
    response.status(500).json({
      message: err.message,
      stack: err.stack
    })
  })

  return router
}
