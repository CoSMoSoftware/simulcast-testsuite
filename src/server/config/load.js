import { initConfig } from './init'
import { readJson } from '../common/util'

export const loadConfig = async () => {
  const rawConfig = await readJson('config/config.json')

  // const serverAddress = process.env.SIMULCAST_ADDRESS
  // if (serverAddress) {
  //   rawConfig.serverAddress = serverAddress
  // }

  return initConfig(rawConfig)
}
