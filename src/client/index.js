// import { runSimulcastApp } from './simulcast'
import { runBroadcastApp } from './broadcast'

window.addEventListener('load', () =>
  runBroadcastApp().catch(console.error))
