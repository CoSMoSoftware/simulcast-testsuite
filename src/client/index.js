import { runSimulcastApp } from './simulcast'

window.addEventListener('load', () =>
  runSimulcastApp().catch(console.error))
