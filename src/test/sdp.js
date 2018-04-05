export const offerSdp = `v=0
o=mozilla...THIS_IS_SDPARTA-60.0 1136776267802857567 0 IN IP4 0.0.0.0
s=-
t=0 0
a=fingerprint:sha-256 10:BD:CA:0C:33:9A:E8:6D:C0:B9:56:69:3A:CF:BF:5C:65:27:0E:3E:44:D5:28:B2:90:E7:D8:AA:61:7F:28:21
a=group:BUNDLE sdparta_0
a=ice-options:trickle
a=msid-semantic:WMS *
m=video 9 UDP/TLS/RTP/SAVPF 120 121 126 97
c=IN IP4 0.0.0.0
a=sendrecv
a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
a=extmap:4/sendonly urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id
a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1
a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1
a=fmtp:120 max-fs=12288;max-fr=60
a=fmtp:121 max-fs=12288;max-fr=60
a=ice-pwd:90ca2656d768b7bf2f4364a536b34021
a=ice-ufrag:6ec653e0
a=mid:sdparta_0
a=msid:- {be1704e6-1f72-4578-9995-5748701afba7}
a=rid:a send
a=rid:b send
a=rid:c send
a=rtcp-fb:120 nack
a=rtcp-fb:120 nack pli
a=rtcp-fb:120 ccm fir
a=rtcp-fb:120 goog-remb
a=rtcp-fb:121 nack
a=rtcp-fb:121 nack pli
a=rtcp-fb:121 ccm fir
a=rtcp-fb:121 goog-remb
a=rtcp-fb:126 nack
a=rtcp-fb:126 nack pli
a=rtcp-fb:126 ccm fir
a=rtcp-fb:126 goog-remb
a=rtcp-fb:97 nack
a=rtcp-fb:97 nack pli
a=rtcp-fb:97 ccm fir
a=rtcp-fb:97 goog-remb
a=rtcp-mux
a=rtpmap:120 VP8/90000
a=rtpmap:121 VP9/90000
a=rtpmap:126 H264/90000
a=rtpmap:97 H264/90000
a=setup:actpass
a=simulcast:send a;b;c
a=ssrc:1972685458 cname:{25a036be-1ab4-4958-9212-8edd1300fa02}
a=ssrc:3186198792 cname:{25a036be-1ab4-4958-9212-8edd1300fa02}
a=ssrc:3522742507 cname:{25a036be-1ab4-4958-9212-8edd1300fa02}
`
export const receiveSdp = `v=0
o=mozilla...THIS_IS_SDPARTA-60.0 1729662482437448756 1 IN IP4 0.0.0.0
s=-
t=0 0
a=fingerprint:sha-256 97:9B:D7:12:3A:90:2E:9E:22:06:8F:92:0E:F9:E1:F5:F8:5F:82:75:10:21:D0:E7:62:AC:E9:AF:BD:B9:EC:02
a=group:BUNDLE sdparta_0
a=ice-options:trickle
a=msid-semantic:WMS *
m=video 9 UDP/TLS/RTP/SAVPF 120 121 126 97
c=IN IP4 0.0.0.0
a=recvonly
a=extmap:1 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
a=extmap:3 urn:ietf:params:rtp-hdrext:sdes:mid
a=fmtp:126 profile-level-id=42e01f;level-asymmetry-allowed=1;packetization-mode=1
a=fmtp:97 profile-level-id=42e01f;level-asymmetry-allowed=1
a=fmtp:120 max-fs=12288;max-fr=60
a=fmtp:121 max-fs=12288;max-fr=60
a=ice-pwd:56d0203666e52d56fcf1341a667ed08b
a=ice-ufrag:c09badff
a=mid:sdparta_0
a=rtcp-fb:120 nack
a=rtcp-fb:120 nack pli
a=rtcp-fb:120 ccm fir
a=rtcp-fb:120 goog-remb
a=rtcp-fb:121 nack
a=rtcp-fb:121 nack pli
a=rtcp-fb:121 ccm fir
a=rtcp-fb:121 goog-remb
a=rtcp-fb:126 nack
a=rtcp-fb:126 nack pli
a=rtcp-fb:126 ccm fir
a=rtcp-fb:126 goog-remb
a=rtcp-fb:97 nack
a=rtcp-fb:97 nack pli
a=rtcp-fb:97 ccm fir
a=rtcp-fb:97 goog-remb
a=rtcp-mux
a=rtpmap:120 VP8/90000
a=rtpmap:121 VP9/90000
a=rtpmap:126 H264/90000
a=rtpmap:97 H264/90000
a=setup:actpass
a=ssrc:356706988 cname:{34405ecb-fb08-4f6f-ac83-92f4748ea7a4}
`
