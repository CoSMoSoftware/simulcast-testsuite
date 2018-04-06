import express from 'express'
import bodyParser from 'body-parser'
import { createApiRouter } from './handler/router'

export const createApp = config => {
  const { staticDir } = config

  const app = express()

  app.use(bodyParser.json())
  app.use('/api', createApiRouter(config))
  app.use(express.static(staticDir))

  return app
}
