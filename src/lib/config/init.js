import { readFile } from '../util'
import { createEndpoint } from 'medooze-media-server'

export const initConfig = async rawConfig => {
  const {
    keyPath,
    certPath,
    staticDir,
    serverPort,
    serverAddress
  } = rawConfig

  const key = await readFile(keyPath)
  const cert = await readFile(certPath)
  const endpoint = createEndpoint(serverAddress)

  const sessionTable = new Map()

  return {
    key,
    cert,
    endpoint,
    staticDir,
    serverPort,
    sessionTable,
    serverAddress
  }
}
