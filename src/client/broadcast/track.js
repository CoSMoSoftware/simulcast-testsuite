export const handleTrackEvent = (pc, container, label) => {
  pc.addEventListener('track', ev => {
    console.log('ontrack event:', ev)

    const videoTrack = ev.track
    console.log('videoTrack:', videoTrack)

    const videoElement = document.createElement('video')
    videoElement.srcObject = new MediaStream([videoTrack])
    videoElement.autoplay = true

    const desc = document.createElement('p')
    desc.innerText = `${label} - stream ID: ${videoTrack.id}`

    const div = document.createElement('div')
    div.classList.add('sink-video-container')
    div.appendChild(videoElement)
    div.appendChild(desc)

    container.appendChild(div)
  })
}
