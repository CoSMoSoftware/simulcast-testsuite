# Simulcast Test Suite

This project contains the web client and server for compliance testing on
the Simulcast protocol for WebRTC. It runs on
[Medooze Media Server Node](https://github.com/medooze/media-server-node)
and is based on its [Simulcast demo](https://github.com/medooze/media-server-demo-node).

## Build Instruction

```bash
git clone https://github.com/CoSMoSoftware/simulcast-testsuite.git
cd simulcast-testsuite
npm install
npm run build-client
MEDIA_SERVER_IP={ServerIP} npm start
```

## Development

For developing the front end client testing, a separate terminal should
be opened running WebPack so that the client source is automatically
rebuilt when the client source code is updated

```bash
npm run dev
```

## Configuration

The media server IP _must_ be set to an accessible IP address from the test
client. An invalid address would cause the ICE connection to fail. Also note
that `127.0.0.1` does _not_ with Medooze. The server IP can be changed in
two ways:

  - `serverAddress` field in [config/config.json](config/config.json)
  - The `MEDIA_SERVER_IP` environment variable. Note that this overrides
    any value in config.json.

## Simulcast Testing

Once the server is up and running, navigate to `https://{serverAddress}:8080`
to see view the Simulcast test web page. You should see two videos in the first
row, with the original peer connection holding the original source video
and the one echoed from the media server.

The second row of videos are created with seperate peer connections requesting
for different version of the Simulcast streams - original resolution, 1/2
resolution, and 1/4 resolution.

## Broadcast Testing

The Simulcast testing should currently work on Firefox but not Chrome. In case
it doesn't work however, try the broadcast test at
`https://{serverAddress}:8080/broadcast.html`. The broadcast test runs the
media server as simple SFU without Simulcast, and should work on any modern
browser that supports WebRTC.
