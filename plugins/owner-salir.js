let handler = async (m, { conn }) => {
  const texto = m.text?.toLowerCase().trim()
  const activadores = ['salir', '.salir', '/salir', '!salir', 'bot fuera', 'vete bot', 'adiós bot']

  // Solo activar si el mensaje coincide con los activadores
  if (!activadores.includes(texto)) return

  // Verifica que esté en grupo
  if (!m.isGroup) return conn.reply(m.chat, '❗ Este comando solo funciona en grupos.', m)

  // Sale del grupo inmediatamente
  await conn.reply(m.chat, '𝐀𝐥𝐞𝐞 𝐁𝐨𝐭 𝐬𝐞 𝐃𝐞𝐬𝐩𝐢𝐝𝐞 👑', m)
  await conn.groupLeave(m.chat)
}
handler.command = /^salir$/i
handler.group = true
handler.botAdmin = false // No necesita ser admin para salirse
handler.register = false
handler.exp = 0

export default handler