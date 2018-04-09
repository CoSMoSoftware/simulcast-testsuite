import { readFile } from '../util'
import MediaServer from 'medooze-media-server'

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
  const endpoint = MediaServer.createEndpoint(serverAddress)

  const simulcastSessionTable = new Map()
  const broadcastSessionTable = new Map()

  MediaServer.enableDebug(true)
  // MediaServer.enableUltraDebug(true)

  return {
    key,
    cert,
    endpoint,
    staticDir,
    serverPort,
    serverAddress,
    simulcastSessionTable,
    broadcastSessionTable
  }
}
