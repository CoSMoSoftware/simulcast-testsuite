import SDPUtils from 'sdp'

export const mungeSdp = sdp => {
  const videoPart = SDPUtils.getMediaSections(sdp)[0]
  const match = videoPart.match(/a=ssrc:(\d+) cname:(.*)\r\n/)
  const msid = videoPart.match(/a=ssrc:(\d+) msid:(.*)\r\n/)
  const lines = sdp.trim().split('\r\n')
  const removed = lines.splice(lines.length - 4, 4)
  const videoSSRC1 = parseInt(match[1])
  // const rtxSSRC1 = SDPUtils.matchPrefix(videoPart, 'a=ssrc-group:FID ')[0].split(' ')[2]
  const videoSSRC2 = videoSSRC1 + 1
  const rtxSSRC2 = videoSSRC1 + 2
  const videoSSRC3 = videoSSRC1 + 3
  const rtxSSRC3 = videoSSRC1 + 4

  lines.push(removed[0])
  lines.push(removed[1])

  lines.push('a=ssrc:' + videoSSRC2 + ' cname:' + match[2])
  lines.push('a=ssrc:' + videoSSRC2 + ' msid:' + msid[2])
  lines.push('a=ssrc:' + rtxSSRC2 + ' cname:' + match[2])
  lines.push('a=ssrc:' + rtxSSRC2 + ' msid:' + msid[2])
  lines.push('a=ssrc:' + videoSSRC3 + ' cname:' + match[2])
  lines.push('a=ssrc:' + videoSSRC3 + ' msid:' + msid[2])
  lines.push('a=ssrc:' + rtxSSRC3 + ' cname:' + match[2])
  lines.push('a=ssrc:' + rtxSSRC3 + ' msid:' + msid[2])
  lines.push('a=ssrc-group:FID ' + videoSSRC2 + ' ' + rtxSSRC2)
  lines.push('a=ssrc-group:FID ' + videoSSRC3 + ' ' + rtxSSRC3)
  lines.push('a=ssrc-group:SIM ' + videoSSRC1 + ' ' + videoSSRC2 + ' ' + videoSSRC3)

  lines.push('a=simulcast:send hi;mid;low')
  lines.push('a=rid:hi send ssrc=' + videoSSRC2)
  lines.push('a=rid:mid send ssrc=' + videoSSRC1)
  lines.push('a=rid:low send ssrc=' + videoSSRC3)
  lines.push('a=x-google-flag:conference')

  return lines.join('\r\n') + '\r\n'
}
