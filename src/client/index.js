import { streamSimulcast } from './source'
import { createEchoStreams } from './sink'

const runApp = async () => {
  console.log('running simulcast test')

  const sourceVideo = document.getElementById('source-video')
  const sinkVideoContainer = document.getElementById('sink-video-container')

  const result = await streamSimulcast(sinkVideoContainer, sourceVideo)
  console.log('stream result:', result)

  // const { sessionId, tracks } = result
  // await createEchoStreams(sinkVideoContainer, sessionId, tracks)
}

window.addEventListener('load', () =>
  runApp().catch(console.error))
