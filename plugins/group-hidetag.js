const handler = async (m, { conn, text, participants }) => {
  let body = m.text?.trim().toLowerCase()
  let comandos = ['n', 'notify', 'noti', 'notificar', 'hidetag', 'hidetah', 'hidet']
  let match = comandos.find(cmd => body?.startsWith(cmd))

  if (!match) return  // No es comando válido sin prefijo
  if (!m.isGroup) return m.reply('❗ Este comando solo funciona en grupos')
  if (!participants || participants.length === 0) return m.reply('❗ No se pudo obtener la lista de participantes.')

  const users = participants.map(p => p.id)
  const citado = m.quoted
  const opciones = { mentions: users, quoted: m }

  try {
    if (citado) {
      const mime = citado.mimetype || ''
      if (/image|video|sticker|audio/.test(mime)) {
        const media = await citado.download()
        if (!media) throw '❌ No se pudo descargar el medio.'

        const msg = citado.mtype === 'imageMessage' ? { image: media } :
                    citado.mtype === 'videoMessage' ? { video: media } :
                    citado.mtype === 'audioMessage' ? { audio: media, ptt: true } :
                    citado.mtype === 'stickerMessage' ? { sticker: media } : {}

        if (msg.image || msg.video) msg.caption = text || ''
        return await conn.sendMessage(m.chat, { ...msg, ...opciones })
      } else {
        const contenido = text || citado.text || citado.body || '📢'
        return await conn.sendMessage(m.chat, { text: contenido, ...opciones })
      }
    } else {
      const contenido = body.split(' ').slice(1).join(' ') || '📢'
      return await conn.sendMessage(m.chat, { text: contenido, ...opciones })
    }
  } catch (err) {
    console.error('❌ Error al notificar:', err)
    return m.reply('❗ No se pudo enviar la notificación.')
  }
}

// No dependemos del prefijo
handler.customPrefix = /^([.!]?)?(n|notify|noti|notificar|hidetag|hidetah|hidet)$/i
handler.command = new RegExp('')
handler.group = true
handler.admin = true

export default handler