const handler = async (m, { conn, participants }) => {
  const texto = m.text?.toLowerCase().trim()

  const comandos = /^(?:\.?kick|\.?expulsar|\.?fuera|\.?sacar)(\s|$)/i
  if (!comandos.test(texto)) return

  if (!m.isGroup) return m.reply('🚫 Este comando solo funciona en grupos.')

  const botAdmin = participants.find(p => p.id === conn.user.jid)?.admin
  const userAdmin = participants.find(p => p.id === m.sender)?.admin
  if (!botAdmin) return m.reply('🤖 Necesito ser admin para expulsar.')
  if (!userAdmin) return m.reply('🚷 Solo los admins pueden usar este comando.')

  // Detectar al usuario objetivo
  const mentioned = m.mentionedJid?.[0]
  const quoted = m.quoted?.sender
  const reenviado = m.msg?.contextInfo?.participant

  const target = mentioned || quoted || reenviado

  if (!target) return m.reply('❗ Debes mencionar o responder a alguien para expulsarlo.')

  try {
    await conn.groupParticipantsUpdate(m.chat, [target], 'remove')
  } catch {
    m.reply('⚠️ No pude expulsarlo. Tal vez es admin.')
  }
}

handler.customPrefix = /^\.?kick|\.?expulsar|\.?fuera|\.?sacar/i
handler.command = /^$/ // sin prefijo
handler.group = true

export default handler