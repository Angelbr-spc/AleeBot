let handler = async (m, { conn }) => {
  if (!m.isGroup) return conn.reply(m.chat, '*❌ Este comando solo funciona en grupos.*', m)

  let group = await conn.groupMetadata(m.chat)
  let bot = conn.user.jid
  let isBotAdmin = group.participants.find(p => p.id === bot)?.admin
  let isUserAdmin = group.participants.find(p => p.id === m.sender)?.admin

  if (!isUserAdmin) return conn.reply(m.chat, '*🚫 Solo los administradores pueden usar este comando.*', m)
  if (!isBotAdmin) return conn.reply(m.chat, '*❌ Necesito ser administrador para cerrar el grupo.*', m)

  await conn.groupSettingUpdate(m.chat, 'announcement')
  conn.reply(m.chat, '*🔒 Grupo cerrado. Solo los administradores pueden escribir.*', m)
}

handler.customPrefix = /^(\.?cerrar|cerrar)$/i
handler.command = /^$/ // para que funcione el customPrefix
handler.group = true
handler.admin = true

export default handler