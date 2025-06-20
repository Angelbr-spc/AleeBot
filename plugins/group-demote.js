const handler = async (m, { conn, participants }) => {
  const texto = (m.text || '').toLowerCase().trim()
  const activadores = ['demote', 'bajar', 'quitar admin', 'fuera admin']
  const activado = activadores.some(p => texto.startsWith(p))
  if (!activado || !m.isGroup) return

  let usuario
  if (m.quoted) {
    usuario = m.quoted.sender
  } else {
    const mencionados = m.mentionedJid || []
    if (mencionados.length > 0) usuario = mencionados[0]
  }

  if (!usuario) return

  const esAdmin = participants.find(p => p.id === usuario)?.admin
  if (!esAdmin) return

  await conn.groupParticipantsUpdate(m.chat, [usuario], 'demote')
}
handler.customPrefix = /^demote|bajar|quitar admin|fuera admin$/i
handler.command = new RegExp
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler