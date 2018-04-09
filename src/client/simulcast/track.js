export const handleTrackEvent = (pc, container, label) => {
  pc.addEventListener('track', ev => {
    console.log('ontrack event:', ev)

    const mediaStreams = ev.streams
    console.log('mediaStreams:', mediaStreams)

    for (const mediaStream of mediaStreams) {
      const videoElement = document.createElement('video')
      videoElement.srcObject = mediaStream
      videoElement.autoplay = true

      const desc = document.createElement('p')
      desc.innerText = `${label} - stream ID: ${mediaStream.id}`

      const div = document.createElement('div')
      div.classList.add('sink-video-container')
      div.appendChild(videoElement)
      div.appendChild(desc)

      container.appendChild(div)
    }
  })
}
