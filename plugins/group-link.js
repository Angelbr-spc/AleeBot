let handler = async (m, { conn }) => {
  if (!m.isGroup) return
  if (!conn.groupInviteCode) return

  try {
    const code = await conn.groupInviteCode(m.chat)
    m.reply(`🔗 https://chat.whatsapp.com/${code}`)
  } catch {
    m.reply('❌ No tengo permisos o ocurrió un error.')
  }
}

handler.customPrefix = /^(link|\.link)$/i
handler.command = new RegExp // Para que funcione solo con customPrefix
handler.group = true

export default handler