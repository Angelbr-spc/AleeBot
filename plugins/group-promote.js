const handler = async (m, { conn, participants }) => {
  const texto = (m.text || '').trim().toLowerCase()

  // Activadores exactos sin prefijo
  if (!/^promote$|^ascender$|^admin$/i.test(texto)) return
  if (!m.isGroup) return

  const userSender = participants.find(u => u.id === m.sender)
  const botSender = participants.find(u => u.id === conn.user.jid)

  if (!userSender?.admin) return
  if (!botSender?.admin) return

  const targets = m.mentionedJid?.length
    ? m.mentionedJid
    : m.quoted
    ? [m.quoted.sender]
    : []

  if (!targets.length) return

  try {
    await conn.groupParticipantsUpdate(m.chat, targets, 'promote')
  } catch (err) {}
}

handler.customPrefix = /^promote$|^ascender$|^admin$/i
handler.command = new RegExp // solo sin prefijo
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler