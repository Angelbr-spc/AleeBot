const handler = async (m, { conn, participants }) => {
  const texto = m.text?.toLowerCase().trim()
  if (!['kickall', 'banall', 'kikoall'].includes(texto)) return

  const botJid = conn.user.jid
  const sender = m.sender
  const owners = global.owner?.map(([v]) => v) || []

  const admins = participants.filter(p => p.admin).map(p => p.id)
  const botIsAdmin = admins.includes(botJid)
  const userIsAdmin = admins.includes(sender)

  if (!userIsAdmin) return m.reply('🚫 Solo los *administradores* del grupo pueden usar este comando.')
  if (!botIsAdmin) return m.reply('🤖 Necesito ser *administrador* para expulsar miembros.')

  const expulsar = participants
    .filter(p =>
      p.id !== botJid &&
      p.id !== sender &&
      !p.admin &&
      !owners.includes(p.id)
    )
    .map(p => p.id)

  if (!expulsar.length) return m.reply('✅ No hay miembros para expulsar.')

  try {
    await conn.groupParticipantsUpdate(m.chat, expulsar, 'remove')
    await m.reply(`✅ Se expulsaron a *${expulsar.length}* miembros del grupo.\n\n𝐕𝐀𝐂𝐈𝐀𝐍𝐃𝐎 𝐄𝐋 𝐁𝐀𝐒𝐔𝐑𝐄𝐑𝐎 🧹🔥`)
  } catch (e) {
    console.error('❌ Error al expulsar:', e)
    await m.reply('⚠️ Hubo un error al intentar expulsar a los miembros.')
  }
}

handler.customPrefix = /^kickall$|^banall$|^kikoall$/i
handler.command = new RegExp
handler.group = true
handler.botAdmin = true

export default handler