import { runSimulcastApp } from './simulcast'
// import { runBroadcastApp } from './broadcast'

window.addEventListener('load', () =>
  runSimulcastApp().catch(console.error))
