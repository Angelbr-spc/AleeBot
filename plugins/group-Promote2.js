const handler = async (m, { conn, args, participants }) => {
  if (!m.isGroup) return

  const userSender = participants.find(u => u.id === m.sender)
  const botSender = participants.find(u => u.id === conn.user.jid)
  if (!userSender?.admin && !m.fromMe) return
  if (!botSender?.admin) return

  let user
  if (m.mentionedJid?.length) {
    user = m.mentionedJid[0]
  } else if (m.quoted) {
    user = m.quoted.sender
  } else {
    return
  }

  try {
    await conn.groupParticipantsUpdate(m.chat, [user], 'promote')
  } catch (e) {}
}

handler.command = /^promote$/i
handler.group = true
handler.botAdmin = true

export default handler