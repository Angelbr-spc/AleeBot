let handler = async (m, { conn, text }) => {
  let user

  if (m.quoted) {
    user = m.quoted.sender
  } else if (text) {
    let number = text.replace(/\D+/g, '')
    if (number.length < 11 || number.length > 13) return
    user = number + '@s.whatsapp.net'
  } else return

  try {
    await conn.groupParticipantsUpdate(m.chat, [user], 'demote')
  } catch (e) {}
}

handler.help = ['demote *@tag*']
handler.tags = ['group']
handler.command = ['demote', 'degradar'] 
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler