import { streamSimulcast } from './source'
import { createEchoStreams } from './sink'

export const runSimulcastApp = async () => {
  console.log('running simulcast test')

  const sourceVideo = document.getElementById('source-video')
  const sinkVideoContainer = document.getElementById('sink-video-container')

  const result = await streamSimulcast(sinkVideoContainer, sourceVideo)
  console.log('stream result:', result)

  // await new Promise(resolve => setTimeout(resolve, 3000))

  const { sessionId, tracks } = result
  await createEchoStreams(sinkVideoContainer, sessionId, tracks)
}
