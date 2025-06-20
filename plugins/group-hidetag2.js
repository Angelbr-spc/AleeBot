const handler = async (m, { conn, text, participants }) => {
  const users = participants.map(u => u.id)
  const quoted = m.quoted || m
  const mime = (quoted.msg || quoted).mimetype || ''
  const caption = text || quoted.text || ''

  console.log('MIME:', mime)
  console.log('TEXT:', caption)

  try {
    if (/image|video|audio|document|sticker/.test(mime)) {
      const media = await quoted.download()
      const type = mime.split('/')[0]

      await conn.sendMessage(m.chat, {
        [type]: media,
        mimetype: mime,
        caption,
        ptt: mime.includes('audio'),
        contextInfo: { mentionedJid: users }
      }, { quoted: m })

    } else {
      await conn.sendMessage(m.chat, {
        text: caption,
        contextInfo: { mentionedJid: users }
      }, { quoted: m })
    }
  } catch (e) {
    console.error('ERROR EN .n:', e)
    await conn.reply(m.chat, '❌ Falló la notificación', m)
  }
}

handler.command = ['n']
handler.group = true
handler.admin = true

export default handler