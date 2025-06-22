let handler = async (m, { conn }) => {
  if (!m.isGroup) return
  if (!conn.groupInviteCode) return

  try {
    const code = await conn.groupInviteCode(m.chat)
    m.reply(`🔗 https://chat.whatsapp.com/${code}`)
  } catch {
    m.reply('❌ 𝐍𝐨 𝐭𝐞𝐧𝐠𝐨 𝐩𝐞𝐫𝐦𝐢𝐬𝐨𝐬 𝐨 𝐨𝐜𝐮𝐫𝐫𝐢ó 𝐮𝐧 𝐞𝐫𝐫𝐨𝐫.')
  }
}

handler.customPrefix = /^(link|\.link)$/i
handler.command = new RegExp // Para que funcione solo con customPrefix
handler.group = true

export default handler