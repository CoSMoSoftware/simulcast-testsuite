import { readFile } from '../util'
import { initConfig } from './init'

export const loadConfig = async () => {
  const configStr = await readFile('config/config.json', 'utf8')
  const rawConfig = JSON.parse(configStr)

  const serverAddress = process.env.SIMULCAST_ADDRESS
  if (serverAddress) {
    rawConfig.serverAddress = serverAddress
  }

  return initConfig(rawConfig)
}
