import { createApp } from './app'
import { createServer } from 'https'
import { loadConfig } from './config/load'
import { handleError } from './common/util'

const runServer = async () => {
  const config = await loadConfig()

  const { key, cert, serverPort } = config

  const app = createApp(config)

  const server = createServer({
    key,
    cert
  }, app)

  server.listen(serverPort)

  console.log('simulcast test server listening at', serverPort)
}

if (require.main === module) {
  handleError()
  runServer()
}
