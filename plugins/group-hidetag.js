const handler = async (m, { conn, text, participants }) => {
  let body = m.text?.trim().toLowerCase()
  let comandos = ['n', 'notify', 'noti', 'notificar', 'hidetag', 'hidetah', 'hidet']
  let match = comandos.find(cmd => body?.startsWith(cmd))

  if (!match) return  // No es comando válido sin prefijo
  if (!m.isGroup) return m.reply('❗ 𝐄𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐬𝐨𝐥𝐨 𝐟𝐮𝐧𝐜𝐢𝐨𝐧𝐚 𝐞𝐧 𝐠𝐫𝐮𝐩𝐨𝐬')
  if (!participants || participants.length === 0) return m.reply('❗ 𝐍𝐨 𝐬𝐞 𝐩𝐮𝐝𝐨 𝐨𝐛𝐭𝐞𝐧𝐞𝐫 𝐥𝐚 𝐥𝐢𝐬𝐭𝐚 𝐝𝐞 𝐩𝐚𝐫𝐭𝐢𝐜𝐢𝐩𝐚𝐧𝐭𝐞𝐬.')

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
    return m.reply('❗ 𝐍𝐨 𝐬𝐞 𝐩𝐮𝐝𝐨 𝐞𝐧𝐯𝐢𝐚𝐫 𝐥𝐚 𝐧𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐜𝐢ó𝐧.')
  }
}

// No dependemos del prefijo
handler.customPrefix = /^([.!]?)?(n|notify|noti|notificar|hidetag|hidetah|hidet)$/i
handler.command = new RegExp('')
handler.group = true
handler.admin = true

export default handler