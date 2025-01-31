import { downloadContentFromMessage } from '@adiwajshing/baileys'

let handler = async (m, { conn }) => {
  if (!m.quoted) throw 'Send/Reply Images with the caption *.readviewonve*'
  if (m.quoted.mtype !== 'viewOnceMessageV2') throw 'Ini bukan pesan view-once.'
  let msg = m.quoted.message
  let type = Object.keys(msg)[0]
  let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
  let buffer = Buffer.from([])
  for await (const chunk of media) {
    buffer = Buffer.concat([buffer, chunk])
  }
  if (/video/.test(type)) {
    return conn.sendFile(m.chat, buffer, 'media.mp4', msg[type].caption || '', m)
  } else if (/image/.test(type)) {
    return conn.sendFile(m.chat, buffer, 'media.jpg', msg[type].caption || '', m)
  }
}

handler.help = ['read']
handler.tags = ['tools']
handler.command = /^read/i

handler.register = true

export default handler
