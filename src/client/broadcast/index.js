import { streamBroadcast } from './source'
import { createEchoStream } from './sink'

export const runBroadcastApp = async () => {
  console.log('running broadcast test')

  const sourceVideo = document.getElementById('source-video')
  const sinkVideoContainer = document.getElementById('sink-video-container')

  const result = await streamBroadcast(sinkVideoContainer, sourceVideo)
  console.log('stream result:', result)

  // await new Promise(resolve => setTimeout(resolve, 3000))

  const { sessionId } = result
  await createEchoStream(sinkVideoContainer, sessionId)
}
