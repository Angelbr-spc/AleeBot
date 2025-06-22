const handler = async (m, { conn, command }) => {
  const texto = m.text?.toLowerCase().trim()

  // Palabras clave que activan el comando
  const activadores = ['delete', 'del', 'elimina', 'borrar']
  const coincide = activadores.some(palabra => texto.startsWith(palabra))

  // No continúa si no hay coincidencia y tampoco es un comando
  if (!coincide && !command) return

  if (!m.quoted) return conn.reply(m.chat, '🚩 Responde al mensaje que deseas eliminar.', m)

  try {
    // Elimina usando los datos del mensaje citado
    return await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.quoted.id,
        participant: m.quoted.participant || m.quoted.sender
      }
    })
  } catch {
    try {
      // Método alterno en caso de error
      return conn.sendMessage(m.chat, { delete: m.quoted.vM?.key })
    } catch {
      return conn.reply(m.chat, '❗ No se pudo eliminar el mensaje.', m)
    }
  }
}

handler.help = ['delete']
handler.tags = ['group']
handler.command = /^del(ete)?$/i  // Esto es para que también funcione con prefijo
handler.admin = true
handler.botAdmin = true
handler.group = true // Solo grupos

export default handler